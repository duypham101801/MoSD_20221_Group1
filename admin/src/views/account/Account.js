import React, { useState, useEffect } from 'react'
import { CCol, CRow, CCard, CCardBody, CCardHeader } from '@coreui/react'
import { Table, Space, Button, Modal, Form, Input, Select, notification } from 'antd'
import { Roles } from '../../config/Roles'
import { getToken } from 'src/services/auth'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { createAccount, deleteAccount, getAccountList, updateAccount } from 'src/services/account'
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
// Cac api get list nen co pagination , make editable row to update
function Account() {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 100,
  })
  const [data, setData] = useState()
  const [provinceFilter, setProvinceFilter] = useState([])
  const [districtFilter, setDistrictFilter] = useState([])
  const [statusFilter, setStatusFilter] = useState([])
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [formTitle, setFormTitle] = useState('Them tai khoan')
  const columns = [
    {
      title: 'ID',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      render: (name) => <>{name}</>,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      render: (phone) => <>{phone}</>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (email) => <>{email}</>,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      render: (role) => <>{role}</>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
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
                setFormTitle('Account Details')
              }}
            >
              {'Detail'}
            </Button>
          </Space>
        </>
      ),
    },
  ]

  const setFormData = (_id) => {
    form.resetFields()
    let account = data.find((detail) => detail._id === _id)
    form.setFieldsValue(account)
  }

  // add new
  const onFinish = async (values) => {
    const createAcc = async () => {
      try {
        const res = await createAccount(values)
        if (res) {
          const data = await getAccountList()
          if (data.accounts) {
            let key = 1
            data.accounts.forEach((category) => {
              category.key = key++
            })
            setData(data.accounts)
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
        if (err.status === 401 && err.message === 'authorization_failed') {
          getToken(createAcc)
        } else
          notification.error({
            message: `Error`,
            description: `${Object.values(err.validationErrors)[0]}`,
            placement: `bottomRight`,
            duration: 1.5,
          })
      }
    }
    createAcc()
  }
  const onUpdate = () => {}
  const onDelete = async () => {
    Modal.confirm({
      title: `Delete Area Category`,
      icon: <ExclamationCircleOutlined />,
      content: `You are going to delete this category? Are you sure you want to do this? You can't reverse this`,
      async onOk() {
        const values = await form.validateFields()
        // lay tu form item
        const accountId = values._id
        const deleteCategory = async () => {
          try {
            const res = await deleteAccount(accountId)
            if (res) {
              const data = await getAccountList()
              if (data.accounts) {
                let key = 1
                data.accounts.forEach((category) => {
                  category.key = key++
                })
                setData(data.accounts)
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
            if (err.status === 401 && err.message === 'authorization_failed') {
              getToken(deleteCategory)
            } else
              notification.error({
                message: `Error`,
                description: `${Object.values(err.validationErrors)[0]}`,
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
    const getAccList = async () => {
      try {
        const res = await getAccountList()
        if (res.accounts) {
          let key = 1
          res.accounts.forEach((category) => {
            category.key = key++
          })
          setData(res.accounts)
        }
      } catch (err) {
        if (err.status === 401 && err.message === 'authorization_failed') {
          getToken(getAccList)
        } else
          notification.error({
            message: `Error`,
            description: `${Object.values(err.validationErrors)[0]}`,
            placement: `bottomRight`,
            duration: 1.5,
          })
      }
    }
    getAccList()
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
            name="name"
            label={"User's Name"}
            rules={[
              {
                required: true,
                message: 'Please enter username! ',
              },
            ]}
          >
            <Input placeholder={'Please enter username'} />
          </Form.Item>
          <Form.Item
            name="phone"
            label={'Phone Number'}
            rules={[
              {
                required: true,
                message: 'Please enter phone number! ',
              },
            ]}
          >
            <Input placeholder={'Please enter phone number'} />
          </Form.Item>
          <Form.Item
            name="email"
            label={'Email'}
            rules={[
              {
                required: true,
                message: 'Please enter email! ',
              },
            ]}
          >
            <Input placeholder={'Please enter email'} />
          </Form.Item>
          {/*
          <Form.Item
            name="password"
            label={'Password'}
            rules={[
              {
                message: 'Please enter password! ',
              },
            ]}
          >
            <Input placeholder={'Please enter password'} />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label={'Confirm Password'}
            rules={[
              {
                message: 'Please enter password! ',
              },
            ]}
          >
            <Input placeholder={'Please enter password'} />
          </Form.Item> */}
          <Form.Item
            name="role"
            label={'Role'}
            rules={[
              {
                required: true,
                message: 'Please enter role!',
              },
            ]}
          >
            <Select placeholder={'Please select provinces'}>
              {Object.values(Roles).map((role) => (
                <Option key={role} value={role}></Option>
              ))}
            </Select>
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
          <CCardHeader>Accounts</CCardHeader>
          <CCardBody>
            <Button
              type="primary"
              style={{ marginBottom: 16 }}
              onClick={() => {
                setVisible(true)
                setIsUpdate(false)
                setFormTitle('Add Account')
                form.resetFields()
              }}
            >
              {'Add Account'}
            </Button>
            <Table columns={columns} dataSource={data} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
export default Account
