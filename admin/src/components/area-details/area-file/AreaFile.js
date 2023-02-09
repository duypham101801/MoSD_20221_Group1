import React, { useState, useEffect } from 'react'
import { CCol, CRow, CCard, CCardBody, CCardHeader } from '@coreui/react'
import { Space, Button, Modal, Form, Input, Select, notification, Upload } from 'antd'
import Table from 'ant-responsive-table'

import { uploadButton } from '../area-info/AreaInfo'
import { getAreaCategories } from 'src/services/category'
import { useParams } from 'react-router-dom'
import {
  changeAreaFile,
  changeAreaThumb,
  createAreaFile,
  createFileFile,
  deleteAreaFile,
  getAreaServices,
  updateAreaFile,
} from 'src/services/file'
import { getToken } from 'src/services/auth'
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
function AreaFile() {
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
  const [fileThumb, setFileThumb] = useState([])
  const [file, setFile] = useState([])
  const [visible, setVisible] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [formTitle, setFormTitle] = useState('Them file khu')

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
      dataIndex: 'urlThumb',
      render: (urlThumb) => (
        <>
          {
            <img
              src={urlThumb}
              style={{ maxWidth: '130px', maxHeight: '130px', objectFit: 'cover' }}
            />
          }
        </>
      ),

      key: 'urlThumb',
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: 'Name',
      dataIndex: 'title',
      render: (title) => <>{title}</>,

      key: 'title',
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
    },
    {
      title: 'Link',
      dataIndex: 'urlFile',
      render: (urlFile) => <>{<a href={urlFile}>Link</a>}</>,

      key: 'urlFile',
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
                setFormTitle('Area Files')
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
        title: `Change area file avatar`,
        icon: <ExclamationCircleOutlined />,
        content: `You are going to change this file avatar? Are you sure you want to do this? You can't reverse this`,
        async onOk() {
          const data = {}
          const fileId = form.getFieldValue('_id')
          data.thumb = newFileList[0].originFileObj

          const changeAvatar = async () => {
            try {
              const res = await changeAreaThumb(fileId, data)
              if (res) {
                const data = await getAreaServices(areaId)

                if (data.files) {
                  let key = 1
                  data.files.forEach((category) => {
                    category.key = key++
                  })
                  setData(data.files)
                  setFileThumb(newFileList)
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
              } else
                form.setFields([
                  {
                    name: 'urlThumb',
                    errors: [`${err.validationErrors?.thumb}`],
                  },
                ])
              notification.error({
                message: `Error`,
                description: err.message,
                placement: `bottomRight`,
                duration: 3,
              })
            }
          }
          changeAvatar()
        },
        onCancel() {
          notification.info({
            message: `Notification`,
            description: `Cancel update area file avatar`,
            placement: `bottomRight`,
            duration: 3,
          })
        },
        centered: true,
      })
    } else setFileThumb(newFileList)
  }
  const setFormData = (_id) => {
    form.resetFields()
    let file = data.find((detail) => detail._id === _id)
    // setFile(file.urlFile)
    // setFileThumb(file.urlThumb)
    // trc khi submit can lay id cua category
    setFileThumb([{ uid: '-1', status: 'done', url: file.urlThumb, name: 'thumb' }])
    form.setFieldsValue({
      _id: file._id,
      title: file.title,
      description: file.description,
      urlThumb: file.urlThumb,
    })
  }
  useEffect(() => {
    const getInitData = async () => {
      try {
        const [file, category] = await Promise.all([getAreaServices(areaId), getAreaCategories()])

        if (file.files) {
          let key = 1
          file.files.forEach((category) => {
            category.key = key++
          })
          setData(file.files)
        }
        if (category.categories) {
          let key = 1
          category.categories.forEach((category) => {
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
            description: err.validationErrors
              ? `${Object.values(err.validationErrors)[0]}`
              : err.message,
            placement: `bottomRight`,
            duration: 3,
          })
      }
    }
    getInitData()
  }, [])
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
            const res = await deleteAreaFile(imageId)
            if (res) {
              const res = await getAreaServices(areaId)

              if (res.files) {
                let key = 1
                res.files.forEach((category) => {
                  category.key = key++
                })
                setData(res.files)
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
                description: err.validationErrors
                  ? `${Object.values(err.validationErrors)[0]}`
                  : err.message,
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
        setVisible(false)
      },
      centered: true,
    })
  }

  // update
  const onUpdate = async () => {
    const values = form.getFieldsValue()
    // lay tu form item
    const fileId = values._id
    const data = {}
    data.fileTitle = values.title
    data.fileDesc = values.description
    const updateFile = async () => {
      try {
        const res = await updateAreaFile(fileId, data)
        if (res) {
          const data = await getAreaServices(areaId)

          if (data.files) {
            let key = 1
            data.files.forEach((category) => {
              category.key = key++
            })
            setData(data.files)
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
          getToken(updateFile)
        } else
          notification.error({
            message: `Error`,
            description: err.validationErrors
              ? `${Object.values(err.validationErrors)[0]}`
              : err.message,
            placement: `bottomRight`,
            duration: 3,
          })
      }
    }
    updateFile()
  }

  // add new
  const onFinish = async () => {
    const values = form.getFieldsValue()
    const data = {}
    // phai dung key
    data.fileTitle = values.title
    data.fileDesc = values.description
    data.thumb = fileThumb[0].originFileObj
    data.file = file
    const createFile = async () => {
      try {
        const res = await createAreaFile(areaId, data)
        if (res) {
          const data = await getAreaServices(areaId)
          if (data) {
            let key = 1
            data.files.forEach((category) => {
              category.key = key++
            })
            setData(data.files)
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
          getToken(createFile)
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
            description: err.message,
            placement: `bottomRight`,
            duration: 3,
          })
        }
      }
    }
    createFile()
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0]

    if (isUpdate) {
      Modal.confirm({
        title: `Change area file`,
        icon: <ExclamationCircleOutlined />,
        content: `You are going to change this file? Are you sure you want to do this? You can't reverse this`,
        async onOk() {
          const data = {}
          data.file = file
          const fileId = form.getFieldValue('_id')
          const changeFile = async () => {
            try {
              const res = await changeAreaFile(fileId, data)
              if (res) {
                const data = await getAreaServices(areaId)

                if (data.files) {
                  let key = 1
                  data.files.forEach((category) => {
                    category.key = key++
                  })
                  setData(data.files)
                  setFile(file)
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
                getToken(changeFile)
              } else {
                form.setFields([
                  {
                    name: 'urlFile',
                    errors: [`${err.validationErrors?.file}`],
                  },
                ])
                notification.error({
                  message: `Error`,
                  description: err.message,
                  placement: `bottomRight`,
                  duration: 3,
                })
              }
            }
          }
          changeFile()
        },
        onCancel() {
          notification.info({
            message: `Notification`,
            description: `Cancel change area file`,
            placement: `bottomRight`,
            duration: 3,
          })
        },
        centered: true,
      })
    } else setFile(file)
  }
  return (
    <>
      <Modal
        style={{ marginTop: ' 50px ' }}
        // centered={true}
        open={visible}
        title={formTitle}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <Form form={form} {...formItemLayout} name="form_in_modal">
          <Form.Item name="_id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="title"
            label={'File Name'}
            rules={[
              {
                required: true,
                message: 'Please enter the file name',
              },
            ]}
          >
            <Input placeholder={'Please enter the file name'} />
          </Form.Item>
          <Form.Item
            name="urlFile"
            label={"Area's File"}
            rules={[
              {
                // required: true,
                message: "Please enter the area's file!",
              },
            ]}
          >
            <Input
              type="file"
              onChange={handleFileChange}
              placeholder={"Please enter the area's image"}
            />
          </Form.Item>
          <Form.Item
            name="urlThumb"
            label={'File thumb'}
            rules={[
              {
                required: true,
                message: 'Please enter file thumb!',
              },
            ]}
          >
            <Upload
              fileList={fileThumb}
              beforeUpload={handleBeforeUpload}
              onChange={handleImageChange}
              listType="picture-card"
              maxCount={1}
            >
              {fileThumb.length > 1 ? null : uploadButton}
            </Upload>
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
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: '8px' }}
                onClick={onFinish}
              >
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
          <CCardHeader>Area Files</CCardHeader>
          <CCardBody>
            <Button
              type="primary"
              style={{ marginBottom: 16 }}
              onClick={() => {
                setVisible(true)
                setIsUpdate(false)
                setFormTitle('Add File')
                setFileThumb([])
                form.resetFields()
              }}
            >
              {'Add File'}
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

export default AreaFile
