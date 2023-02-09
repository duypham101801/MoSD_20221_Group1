import React, { useEffect, useState } from 'react'
import { CCol, CRow, CCard, CCardBody, CCardHeader } from '@coreui/react'
import { Space, Button, Modal, Form, Input, Select, notification, Upload } from 'antd'
import Table from 'ant-responsive-table'

import { useParams } from 'react-router-dom'

import {
  createHouseFile,
  deleteHouseFile,
  getFileDetail,
  getHouseFile,
  updateHouseFileUrl,
  updateHouseFileThumb,
  updateHouseFile,
} from 'src/services/file'
import { getToken } from 'src/services/auth'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { uploadButton } from 'src/components/area-details/area-info/AreaInfo'

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
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}
const { Option } = Select
const { TextArea } = Input
function HouseFile() {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 100,
  })
  const [data, setData] = useState()
  const [provinceFilter, setProvinceFilter] = useState([])
  const [districtFilter, setDistrictFilter] = useState([])
  const [areaFilter, setAreaFilter] = useState([])
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [formTitle, setFormTitle] = useState('Them file can')

  const columns = [
    {
      title: 'ID',
      // dataIndex: 'key',
      dataIndex: 'key',

      key: 'key',
      showOnResponse: true,
      showOnDesktop: true,
    },

    {
      title: 'Image',
      dataIndex: 'urlThumb',
      render: (urlThumb) => {
        return (
          <img
            src={urlThumb}
            style={{ maxWidth: '130px', maxHeight: '130px', objectFit: 'cover' }}
          />
        )
      },

      key: 'urlThumb',
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: 'Name',
      dataIndex: 'title',

      key: 'title',
      showOnResponse: true,
      showOnDesktop: true,
      // render: () => (
      //   <>
      //     <p>Resort</p>
      //   </>
      // ),
    },
    {
      title: 'Link',
      dataIndex: 'urlFile',
      render: (urlFile) => (
        <>
          {
            <a target={'_blank'} rel="noopener noreferrer" href={urlFile}>
              Link
            </a>
          }
        </>
      ),

      key: 'urlFile',
      showOnResponse: true,
      showOnDesktop: true,
    },

    // {
    //   title: 'Category',
    //   dataIndex: 'category',
    // },
    {
      title: 'Action',
      dataIndex: '_id',
      render: (_id) => {
        return (
          <>
            <Button
              style={{ marginRight: 10 + 'px' }}
              type="primary"
              onClick={() => {
                setFormData(_id)
                setIsUpdate(true)
                setVisible(true)
                // handleGetFileDetail(_id)
                // handleUpdateHouseFile(_id)
              }}
            >
              {'Update'}
            </Button>

            <Button type="danger" onClick={() => handleDeleteHouseFile(_id)}>
              {'Delete'}
            </Button>
          </>
        )
      },

      key: '_id',
      showOnResponse: true,
      showOnDesktop: true,
    },
  ]

  const { id: houseId } = useParams()
  // console.log(params)
  const [file, setFile] = useState(null)
  const [fileAvatar, setFileAvatar] = useState([])

  const setFormData = (_id) => {
    form.resetFields()
    let file = data.find((detail) => detail._id === _id)

    // setFile(file.urlFile)
    // setFileThumb(file.urlThumb)
    // trc khi submit can lay id cua category

    setFileAvatar([{ uid: '-1', status: 'done', url: file.urlThumb, name: 'thumb' }])
    form.setFieldsValue({
      _id: file._id,
      file_title: file.title,
      file_description: file.description,
    })
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getHouseFile(houseId)

        if (res.files) {
          let key = 1
          res.files.forEach((file) => {
            file.key = key++
          })

          setData(res.files)
        }
      } catch (err) {
        console.log(err.message)
      }
    }

    getData()
  }, [houseId])

  const handleAddHouseFile = (e) => {
    const { file_description, file_title } = form.getFieldsValue()

    const addData = async () => {
      try {
        const res = await createHouseFile(houseId, {
          thumb: fileAvatar[0].originFileObj,

          file: file,
          fileTitle: file_title,
          fileDesc: file_description,
        })

        if (res) {
          const data = await getHouseFile(houseId)

          if (data.files) {
            console.log('new data')
            let key = 1

            data.files.forEach((file) => {
              file.key = key++
            })

            notification.success({
              message: `Notification`,
              description: `${res.message}`,
              placement: `bottomRight`,
              duration: 1.5,
            })

            setData(data.files)
          }
        }

        // setVisible(false)
      } catch (err) {
        // notification.info({
        //   message: `Notification`,
        //   description: `Cannot delete file`,
        //   placement: `bottomRight`,
        //   duration: 1.5,
        // })

        // console.log(err.message)

        if (err.status === 401 && err.message === 'authorization_failed') {
          getToken(addData)
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
            description: err.validationErrors
              ? `${Object.values(err.validationErrors)[0]}`
              : err.message,
            placement: `bottomRight`,
            duration: 1.5,
          })
        }
      }
    }

    addData()
  }

  const handleDeleteHouseFile = (fileId) => {
    Modal.confirm({
      title: `Delete Area Category`,
      icon: <ExclamationCircleOutlined />,
      content: `You are going to delete this category? Are you sure you want to do this? You can't reverse this`,
      async onOk() {
        // Cach duoi danh cho nut Delete ben trong modal update
        // const values = await form.validateFields()
        // // lay tu form item
        // const fileId = values._id
        const deleteFileData = async () => {
          try {
            const res = await deleteHouseFile(fileId)

            if (res) {
              const data = await getHouseFile(houseId)

              if (data.files) {
                let key = 1

                data.files.forEach((file) => {
                  file.key = key++
                })

                setData(data.files)
                notification.success({
                  message: `Notification`,
                  description: `${res.message}`,
                  placement: `bottomRight`,
                  duration: 1.5,
                })
              }
            }
          } catch (err) {
            // notification.info({
            //   message: `Notification`,
            //   description: `Cannot delete file`,
            //   placement: `bottomRight`,
            //   duration: 1.5,
            // })

            // console.log(err.message)

            if (err.status === 401 && err.message === 'authorization_failed') {
              getToken(deleteFileData)
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

        deleteFileData()
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

  const handleUpdateHouseFile = () => {
    const values = form.getFieldsValue()
    // lay tu form item
    const fileId = values._id
    const data = {}
    data.fileTitle = values.file_title
    data.fileDesc = values.file_description

    const updateFile = async () => {
      try {
        const res = await updateHouseFile(fileId, data)

        if (res) {
          const data = await getHouseFile(houseId)

          if (data.files) {
            let key = 1

            data.files.forEach((file) => {
              file.key = key++
            })

            setVisible(false)

            notification.success({
              message: `Notification`,
              description: `${res.message}`,
              placement: `bottomRight`,
              duration: 1.5,
            })

            setData(data.files)
          }
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
            duration: 1.5,
          })
      }
    }

    updateFile()
  }

  const handleFileAvatarChange = ({ fileList: newFileList }) => {
    /*
    console.log('avatar change')
    if (isUpdate) {
      const fileId = form.getFieldValue('_id')
      console.log('fileId', fileId)

      const data = {}
      data.thumb = newFileList[0].originFileObj
      console.log(newFileList[0].originFileObj)
      const changeFileAvatar = async () => {
        try {
          const res = await updateHouseFileThumb(fileId, data)
          if (res) {
            const data = await getHouseFile(houseId)

            if (data.files) {
              let key = 1
              data.files.forEach((file) => {
                file.key = key++
              })
              setData(data.files)
            }
            notification.success({
              message: `Notification`,
              // description: `${res.message}`,
              description: `update ok luon`,
              placement: `bottomRight`,
              duration: 1.5,
            })
          }
        } catch (err) {
          console.log(err)
          if (err.status === 401 && err.message === 'authorization_failed') {
            getToken(changeFileAvatar)
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
      changeFileAvatar()
    }
    setFileAvatar((prev) => [...newFileList])

    */

    if (isUpdate) {
      Modal.confirm({
        title: `Delete Area Category`,
        icon: <ExclamationCircleOutlined />,
        content: `You are going to change this file avatar. Are you sure you want to do this? You can't reverse this`,
        async onOk() {
          const fileId = form.getFieldValue('_id')

          const data = {}
          data.thumb = newFileList[0].originFileObj

          const changeFileAvatar = async () => {
            try {
              const res = await updateHouseFileThumb(fileId, data)
              if (res) {
                const data = await getHouseFile(houseId)

                if (data.files) {
                  let key = 1
                  data.files.forEach((file) => {
                    file.key = key++
                  })
                  setData(data.files)
                  setFileAvatar((prev) => [...newFileList])
                }
                notification.success({
                  message: `Notification`,
                  // description: `${res.message}`,
                  description: `update ok luon`,
                  placement: `bottomRight`,
                  duration: 1.5,
                })
              }
            } catch (err) {
              if (err.status === 401 && err.message === 'authorization_failed') {
                getToken(changeFileAvatar)
              } else
                form.setFields([
                  {
                    name: 'file_avatar',
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
          changeFileAvatar()
        },
        onCancel() {
          notification.info({
            message: `Notification`,
            description: `Cancel change file avatar`,
            placement: `bottomRight`,
            duration: 1.5,
          })
          // setVisible(false)
        },
        centered: true,
      })
    } else {
      setFileAvatar((prev) => [...newFileList])
    }
  }

  const handleChangeFile = (e) => {
    const file = e.target.files[0]
    if (isUpdate) {
      Modal.confirm({
        title: `Change House File Link`,
        icon: <ExclamationCircleOutlined />,
        content: `You are going to change this file. Are you sure you want to do this? You can't reverse this`,
        async onOk() {
          // console.log('isUpdate ???')
          const data = {}
          data.file = file
          const fileId = form.getFieldValue('_id')
          const changeFile = async () => {
            try {
              const res = await updateHouseFileUrl(fileId, data)
              if (res) {
                const data = await getHouseFile(houseId)

                if (data.files) {
                  let key = 1
                  data.files.forEach((category) => {
                    category.key = key++
                  })
                  setData(data.files)
                  setFile((prev) => file)
                }
                notification.success({
                  message: `Notification`,
                  description: `${res.message}`,
                  placement: `bottomRight`,
                  duration: 1.5,
                })
              }
            } catch (err) {
              if (err.status === 401 && err.message === 'authorization_failed') {
                getToken(changeFile)
              } else {
                form.setFields([
                  {
                    name: 'file',
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
            description: `Cancel Change File`,
            placement: `bottomRight`,
            duration: 1.5,
          })
          // setVisible(false)
        },
        centered: true,
      })
    } else {
      setFile((prev) => file)
    }
  }

  const handleBeforeUpload = () => {
    return false
  }
  // console.log('fileAvatar', fileAvatar)

  return (
    <CRow>
      <Modal
        style={{ marginTop: ' 50px ' }}
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
            name="file_title"
            label={'File Title'}
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
            name="file_description"
            label={'File Description'}
            rules={[
              {
                required: true,
                message: 'Please enter the file description',
              },
            ]}
          >
            <TextArea rows={4} placeholder={'Please enter the file description'} />
          </Form.Item>

          <Form.Item
            name="file_avatar"
            label={'File Avatar'}
            rules={[
              {
                required: true,
                message: "Please enter the area's file!",
              },
            ]}
          >
            {/* <Input
              type="file"
              value={fileAvatar}
              onChange={(e) => setFileAvatar(e.target.files[0])}
              placeholder={"Please enter the file's avatar"}
            /> */}
            <Upload
              fileList={fileAvatar}
              beforeUpload={handleBeforeUpload}
              // beforeUpload={false}
              onChange={handleFileAvatarChange}
              listType="picture-card"
              maxCount={1}
            >
              {fileAvatar.length > 1 ? null : uploadButton}
              {/* {uploadButton} */}
            </Upload>
          </Form.Item>

          <Form.Item
            name="file"
            label={'File'}
            rules={[
              {
                required: true,
                message: "Please enter the area's file!",
              },
            ]}
          >
            <Input
              type="file"
              // value={file}
              // onChange={(e) => setFile(e.target.files[0])}
              onChange={handleChangeFile}
              placeholder={'Please enter the file'}
            />
          </Form.Item>

          <Form.Item {...tailLayout}>
            {!isUpdate ? (
              <Button
                type="primary"
                onClick={handleAddHouseFile}
                htmlType="submit"
                style={{ marginRight: 8 }}
              >
                {'Submit'}
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={handleUpdateHouseFile}
                htmlType="submit"
                style={{ marginRight: 8 }}
              >
                {'Update'}
              </Button>
            )}
            <Button htmlType="button" onClick={() => setVisible(false)}>
              {'Cancel'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <CCol xs="12" md="12" className="mb-4">
        <CCard>
          <CCardHeader>House Files</CCardHeader>
          <CCardBody>
            <Button
              type="primary"
              style={{ marginBottom: 16 }}
              onClick={() => {
                setVisible(true)
                setIsUpdate(false)
                setFormTitle('Add File')
                form.resetFields()

                setFileAvatar((prev) => [])
                setFile((prev) => null)
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
    </CRow>
  )
}

export default HouseFile
