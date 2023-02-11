import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { CCol, CRow, CCard, CCardBody, CCardHeader } from '@coreui/react'
import { Space, Button, Modal, Form, Input, Select, notification, Upload } from 'antd'

import Table from 'ant-responsive-table'

import { ExclamationCircleOutlined } from '@ant-design/icons'

import { uploadButton } from '../area-info/AreaInfo'
import { changeAreaImg, getAreaImages } from 'src/services/image'
import { getToken } from 'src/services/auth'
import { deleteAreaImage, createAreaImage, updateAreaImage } from 'src/services/image'

import { getAreaCategories } from 'src/services/category'
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
function AreaImage() {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 100,
  })
  const { areaId } = useParams()
  const [data, setData] = useState()
  const [categoryFilter, setCategoryFilter] = useState([])
  const [districtFilter, setDistrictFilter] = useState([])
  const [areaFilter, setAreaFilter] = useState([])
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [formTitle, setFormTitle] = useState('Them anh khu')
  const [fileList, setFileList] = useState([])
  // record la du lieu data nhap vao
  const columns = [
    {
      title: 'ID',
      dataIndex: 'key',

      key: 'key',
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: 'Image',
      dataIndex: 'url',
      render: (url) => (
        <>
          {
            <img
              src={url}
              style={{ maxWidth: '130px', maxHeight: '130px', objectFit: 'cover' }}
              alt={url}
            />
          }
        </>
      ),

      key: 'url',
      showOnResponse: true,
      showOnDesktop: true,
    },

    {
      title: 'Category',
      dataIndex: 'category',
      filters: categoryFilter,
      filterSearch: true,
      onFilter: (value, record) => record.category === value,
      render: (category) => <>{category}</>,

      key: 'category',
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      render: (description) => <>{description}</>,

      key: 'description',
      showOnResponse: true,
      showOnDesktop: true,
      // align: 'right',
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
  const handleBeforeUpload = () => {
    // setFileList([...fileList])

    return false
  }
  const handleImageChange = ({ fileList: newFileList }) => {
    if (isUpdate) {
      Modal.confirm({
        title: `Change area image`,
        icon: <ExclamationCircleOutlined />,
        content: `You are going to change this image? Are you sure you want to do this? You can't reverse this`,
        async onOk() {
          const imgId = form.getFieldValue('_id')
          const data = newFileList[0].originFileObj

          // doi thanh data.avatar
          // c2 pass newFileList[0].originFileObj
          const changeAvatar = async () => {
            try {
              const res = await changeAreaImg(imgId, data)
              if (res) {
                const data = await getAreaImages(areaId)
                if (data.images) {
                  let key = 1
                  data.images.forEach((category) => {
                    category.key = key++
                  })
                  setData(data.images)
                  setFileList(newFileList)
                }
                notification.success({
                  message: `Notification`,
                  description: `${res.message}`,
                  placement: `bottomRight`,
                  duration: 3,
                })
              }
            } catch (err) {
              if (err.status === 401 && err.message === 'authorization_failed') {
                getToken(changeAvatar)
              } else {
                form.setFields([
                  {
                    name: 'url',
                    errors: [`${err.validationErrors?.image}`],
                  },
                ])
                notification.error({
                  message: `Error`,
                  description: `${err.message}`,
                  placement: `bottomRight`,
                  duration: 3,
                })
              }
            }
          }
          changeAvatar()
        },
        onCancel() {
          notification.info({
            message: `Notification`,
            description: `Cancel update area image`,
            placement: `bottomRight`,
            duration: 3,
          })
        },
        centered: true,
      })
    } else setFileList(newFileList)
  }

  const setFormData = (_id) => {
    form.resetFields()
    let image = data.find((detail) => detail._id === _id)
    // trc khi submit can lay id cua category
    setFileList([{ uid: '-1', status: 'done', url: image.url, name: image.description }])
    form.setFieldsValue({
      _id: image._id,
      // url: image.url,
      category: image.category, //{ text: image.category, value: image.category },
      description: image.description,
    })
  }

  const onDelete = async () => {
    Modal.confirm({
      title: `Delete Area Category`,
      icon: <ExclamationCircleOutlined />,
      content: `You are going to delete this category? Are you sure you want to do this? You can't reverse this`,
      async onOk() {
        const values = await form.validateFields()
        // lay tu form item
        const imageId = values._id
        const deleteCategory = async () => {
          try {
            const res = await deleteAreaImage(imageId)
            if (res) {
              const res = await getAreaImages(areaId)

              if (res.images) {
                let key = 1
                res.images.forEach((category) => {
                  category.key = key++
                })
                setData(res.images)
              }
              setVisible(false)
              notification.success({
                message: `Notification`,
                description: `${res.message}`,
                placement: `bottomRight`,
                duration: 3,
              })
            }
          } catch (err) {
            if (err.status === 401 && err.message === 'authorization_failed') {
              getToken(deleteCategory)
            } else
              notification.error({
                message: `Error`,
                description: `${err.message}`,
                placement: `bottomRight`,
                duration: 3,
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
          duration: 3,
        })
      },
      centered: true,
    })
  }
  // add new
  const onFinish = async (values) => {
    // const value = await form.validateFields()

    const categoryId = categoryFilter.find((e) => e.name === values.category)._id
    const descImage = values.description

    const data = {}
    // phai dung key
    data.categoryId = categoryId
    data.descImage = descImage
    data.image = fileList[0].originFileObj
    const createArea = async () => {
      try {
        const res = await createAreaImage(areaId, data)
        if (res) {
          const data = await getAreaImages(areaId)
          if (data) {
            let key = 1
            data.images.forEach((category) => {
              category.key = key++
            })
            setData(data.images)
            // setVisible(false)
            notification.success({
              message: `Notification`,
              description: `${res.message}`,
              placement: `bottomRight`,
              duration: 3,
            })
          }
        }
      } catch (err) {
        if (err.status === 401 && err.message === 'authorization_failed') {
          getToken(createArea)
        } else {
          if (err.validationErrors) {
            const error = []
            for (const [key, value] of Object.entries(err.validationErrors)) {
              error.push({ name: key, errors: [`${value}`] })
            }
            form.setFields(error)
          }
          notification.error({
            message: `Error`,
            description: `${err.message}`,
            placement: `bottomRight`,
            duration: 3,
          })
        }
      }
    }
    createArea()
    setFileList([])
  }

  // update
  const onUpdate = async () => {
    // lay tu form item
    const values = await form.validateFields()
    const imgId = values._id

    const category = categoryFilter.find((e) => e.name === values.category)

    const descImage = values.description

    const data = {}
    // phai dung key
    data.categoryId = category._id
    data.descImage = descImage

    const updateAreaImg = async () => {
      try {
        const res = await updateAreaImage(imgId, data)
        if (res) {
          const data = await getAreaImages(areaId)
          if (data.images) {
            let key = 1
            data.images.forEach((category) => {
              category.key = key++
            })
            setData(data.images)
          }
          setVisible(false)
          notification.success({
            message: `Notification`,
            description: `${res.message}`,
            placement: `bottomRight`,
            duration: 3,
          })
        }
      } catch (err) {
        if (err.status === 401 && err.message === 'authorization_failed') {
          getToken(updateAreaImg)
        } else
          notification.error({
            message: `Error`,
            description: `${err.message}`,
            placement: `bottomRight`,
            duration: 3,
          })
      }
    }
    updateAreaImg()
  }
  useEffect(() => {
    const getInitData = async () => {
      try {
        const [image, category] = await Promise.all([getAreaImages(areaId), getAreaCategories()])

        if (image.images) {
          let key = 1
          image.images.forEach((category) => {
            category.key = key++
          })
          setData(image.images)
        }
        if (category.categories) {
          let key = 1
          category.categories.forEach((category) => {
            category.key = key++
            category.text = category.name
            category.value = category.name
          })
          setCategoryFilter(category.categories)
        }
      } catch (err) {
        if (err.status === 401 && err.message === 'authorization_failed') {
          getToken(getInitData)
        } else
          notification.error({
            message: `Error`,
            description: `${err.message}`,
            placement: `bottomRight`,
            duration: 3,
          })
      }
    }
    getInitData()
  }, [])
  // sua lai thanh upload image
  return (
    <>
      <Modal
        open={visible}
        title={formTitle}
        footer={null}
        onCancel={() => setVisible(false)}
        style={{ marginTop: '25px' }}
      >
        <Form form={form} {...formItemLayout} name="form_in_modal" onFinish={onFinish}>
          <Form.Item name="_id" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="url" label={"Area's Image"}>
            <Upload
              fileList={fileList}
              beforeUpload={handleBeforeUpload}
              onChange={handleImageChange}
              listType="picture-card"
              maxCount={1}
            >
              {fileList.length > 1 ? null : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item
            name="category"
            label={"Area's Category"}
            rules={[
              {
                required: true,
                message: "Please enter the area's category!",
              },
            ]}
          >
            <Select placeholder={'Please select category'}>
              {categoryFilter?.map((category) => (
                <Option value={category.value} key={category._id}></Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label={'Description'}
            rules={[
              {
                required: true,
                message: 'Please enter description!',
              },
            ]}
          >
            <Input placeholder={'Please enter description'} />
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
      <CCol xs={12} className="mb-4">
        <CCard>
          <CCardHeader>{'Area Images'}</CCardHeader>
          <CCardBody>
            <Button
              type="primary"
              style={{ marginBottom: 16 }}
              onClick={() => {
                setVisible(true)
                setIsUpdate(false)
                setFileList([])
                setFormTitle('Add Image')
                form.resetFields()
              }}
            >
              {'Add Image'}
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
    </>
  )
}

export default AreaImage
