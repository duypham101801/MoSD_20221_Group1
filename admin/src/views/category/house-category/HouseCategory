import React, { useState, useEffect } from 'react'
import { CCol, CRow, CCard, CCardBody, CCardHeader } from '@coreui/react'
import { Space, Button, Modal, Form, Input, Select, notification } from 'antd'

import Table from 'ant-responsive-table'

import { getToken } from 'src/services/auth'
import * as service from 'src/services/category'
import { ExclamationCircleOutlined } from '@ant-design/icons'
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}
const { Option } = Select
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}
// Cac api get list nen co pagination
function HouseCategory() {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 100,
  })
  const [data, setData] = useState()
  const [provinceFilter, setProvinceFilter] = useState([])
  const [districtFilter, setDistrictFilter] = useState([])
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [formTitle, setFormTitle] = useState('Them tai khoan')
  const columns = [
    {
      title: 'ID',
      dataIndex: 'key',

      key: 'key',
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      render: (name) => <>{name}</>,

      key: 'name',
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: 'Action',
      dataIndex: '_id',
      render: (_id) => (
        <>
          <Space size="middle">
            <Button
              onClick={() => {
                setFormData(_id)
                setVisible(true)
                setIsUpdate(true)
                setFormTitle('Area Categories')
              }}
            >
              {'Detail'}
            </Button>
          </Space>
        </>
      ),

      key: '_id',
      showOnResponse: true,
      showOnDesktop: true,
    },
  ]
  const setFormData = (_id) => {
    form.resetFields()
    let category = data.find((detail) => detail._id === _id)
    form.setFieldsValue({
      _id: category._id,
      category: category.name,
    })
  }
  // add new
  const onFinish = async (values) => {
    let inputs = {
      categoryName: values.category,
    }

    const createCategory = async () => {
      try {
        const res = await service.addHouseCategory(inputs)
        if (res) {
          const data = await service.getHouseCategories()
          if (data.categories) {
            let key = 1
            data.categories.forEach((category) => {
              category.key = key++
            })
            setData(data.categories)
          }
          setVisible(false)
          notification.success({
            message: `Notification`,
            description: `${res.message}`,
            placement: `bottomRight`,
            duration: 1.5,
          })
        }
      } catch (err) {
        if (err.status === 401 && err.statusText === 'Unauthorized') {
          getToken(createCategory)
        } else
          notification.error({
            message: `Error`,
            description: err.validationErrors
              ? `${Object.values(err.validationErrors)[0]}`
              : err.message,
            placement: `bottomRight`,
            duration: 1.5,
          })
      }
    }
    createCategory()
  }

  // update
  const onUpdate = async () => {
    const values = await form.validateFields()
    // lay tu form item
    const areaId = values._id
    let inputs = {
      categoryName: values.category,
    }
    const updateCategory = async () => {
      try {
        const res = await service.updateHouseCategory(areaId, inputs)
        if (res) {
          const data = await service.getHouseCategories()
          if (data.categories) {
            let key = 1
            data.categories.forEach((category) => {
              category.key = key++
            })
            setData(data.categories)
          }
          setVisible(false)
          notification.success({
            message: `Notification`,
            description: `${res.message}`,
            placement: `bottomRight`,
            duration: 1.5,
          })
        }
      } catch (err) {
        if (err.status === 401 && err.statusText === 'Unauthorized') {
          getToken(updateCategory)
        } else
          notification.error({
            message: `Error`,
            description: err.validationErrors
              ? `${Object.values(err.validationErrors)[0]}`
              : err.message,
            placement: `bottomRight`,
            duration: 1.5,
          })
      }
    }
    updateCategory()
  }

  const onDelete = async () => {
    Modal.confirm({
      title: `Delete Area Category`,
      icon: <ExclamationCircleOutlined />,
      content: `You are going to delete this category? Are you sure you want to do this? You can't reverse this`,
      async onOk() {
        const values = await form.validateFields()
        // lay tu form item
        const areaId = values._id
        const deleteCategory = async () => {
          try {
            const res = await service.deleteHouseCategory(areaId)
            if (res) {
              const data = await service.getHouseCategories()
              if (data.categories) {
                let key = 1
                data.categories.forEach((category) => {
                  category.key = key++
                })
                setData(data.categories)
              }
              setVisible(false)
              notification.success({
                message: `Notification`,
                description: `${res.message}`,
                placement: `bottomRight`,
                duration: 1.5,
              })
            }
          } catch (err) {
            if (err.status === 401 && err.statusText === 'Unauthorized') {
              getToken(deleteCategory)
            } else
              notification.error({
                message: `Error`,
                description: err.validationErrors
                  ? `${Object.values(err.validationErrors)[0]}`
                  : err.message,
                placement: `bottomRight`,
                duration: 1.5,
              })
          }
        }
        deleteCategory()
      },
      onCancel() {
        notification.info({
          message: `Notification`,
          description: `Cancel delete area category`,
          placement: `bottomRight`,
          duration: 1.5,
        })
        setVisible(false)
      },
      centered: true,
    })
  }
  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await service.getHouseCategories()
        if (res && res.categories) {
          let key = 1
          res.categories.forEach((category) => {
            category.key = key++
          })
          setData(res.categories)
        }
      } catch (err) {
        if (err.status === 401 && err.statusText === 'Unauthorized') {
          getToken(getCategory)
        } else
          notification.error({
            message: `Error`,
            description: err.validationErrors
              ? `${Object.values(err.validationErrors)[0]}`
              : err.message,
            placement: `bottomRight`,
            duration: 1.5,
          })
      }
    }
    getCategory()
  }, [])
  return (
    <CRow>
      <Modal
        style={{ marginTop: ' 100px ' }}
        centered={true}
        open={visible}
        title={formTitle}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <Form form={form} {...formItemLayout} name="form_in_modal" onFinish={onFinish}>
          <Form.Item name="_id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label={'Category'}
            rules={[
              {
                required: true,
                message: 'Please enter category!',
              },
            ]}
          >
            <Input placeholder={'Please enter category'} />
          </Form.Item>
          <Form.Item {...tailLayout}>
            {isUpdate ? (
              <>
                <Button
                  type="primary"
                  htmlType="button"
                  onClick={() => onUpdate()}
                  style={{ marginRight: '8px' }}
                >
                  {'Update'}
                </Button>
                <Button
                  type="danger"
                  htmlType="button"
                  onClick={() => onDelete()}
                  style={{ marginRight: '8px' }}
                >
                  {'Delete'}
                </Button>
              </>
            ) : (
              <Button type="primary" htmlType="submit" style={{ marginRight: '8px' }}>
                {'Create'}
              </Button>
            )}
            <Button htmlType="button" onClick={() => setVisible(false)}>
              {'Cancel'}
            </Button>{' '}
          </Form.Item>
        </Form>
      </Modal>
      <CCol xs="12" md="12" className="mb-4">
        <CCard>
          <CCardHeader>List Categories</CCardHeader>
          <CCardBody>
            <Button
              type="primary"
              style={{ marginBottom: 16 }}
              onClick={() => {
                setVisible(true)
                setIsUpdate(false)
                setFormTitle('Add Category')
                form.resetFields()
              }}
            >
              {'Add Category'}
            </Button>
            <Table
              antTableProps={{
                showHeader: true,
                columns,
                dataSource: data,
                pagination: false,
              }}
              mobileBreakPoint={768}
              // columns={columns}
              // dataSource={data}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
export default HouseCategory
