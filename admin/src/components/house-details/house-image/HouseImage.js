import React, { useEffect, useState } from 'react'
import { CCol, CRow, CCard, CCardBody, CCardHeader } from '@coreui/react'
import { Space, Button, Modal, Form, Input, Select, notification, Upload } from 'antd'
import Table from 'ant-responsive-table'

import { uploadButton } from 'src/components/area-details/area-info/AreaInfo'
import {
  changeHouseImage,
  updateHouseImage_Img,
  createHouseImage,
  deleteHouseImage,
  getHouseImages,
  updateHouseImage_Info,
} from 'src/services/image'
import { useParams } from 'react-router-dom'
import { getHouseCategories } from 'src/services/category'
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
function HouseImage() {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 100,
  })
  const [data, setData] = useState()
  const [provinceFilter, setProvinceFilter] = useState([])
  const [districtFilter, setDistrictFilter] = useState([])
  const [areaFilter, setAreaFilter] = useState([])
  const [houseFilter, setHouseFilter] = useState([])
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [formTitle, setFormTitle] = useState('Them anh can')
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
          <img src={url} style={{ maxWidth: '130px', maxHeight: '130px', objectFit: 'cover' }} />
        </>
      ),

      key: 'url',
      showOnResponse: true,
      showOnDesktop: true,
    },

    {
      title: 'Category',
      dataIndex: 'category',

      key: 'category',
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',

      key: 'description',
      showOnResponse: true,
      showOnDesktop: true,
    },
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
                // handleAddHouseImage()
                // handleGetFileDetail(_id)
                // handleUpdateHouseFile(_id)
              }}
            >
              {'Detail'}
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

  const [houseImage, setHouseImage] = useState([])
  const { id: houseId } = useParams()
  const [categoryFilter, setCategoryFilter] = useState([])

  // set value to be displayed on form field
  const setFormData = (_id) => {
    form.resetFields()

    let image = data.find((image) => image._id === _id)

    setHouseImage([{ uid: '-1', status: 'done', url: image.url, name: image.description }])

    form.setFieldsValue({
      _id: image._id,

      category: {
        text: image.category,
        value: image.category,
      },
      // category: image.category,

      description: image.description,
    })
  }

  // get init data
  useEffect(() => {
    const getInitData = async () => {
      try {
        const [image, category] = await Promise.all([getHouseImages(houseId), getHouseCategories()])

        if (image.images) {
          console.log(image)
          let key = 1
          image.images.forEach((category) => {
            category.key = key++
          })
          setData(image.images)
        }

        console.log('image', image)
        if (category.categories) {
          console.log(category)
          let key = 1
          category.categories.forEach((category) => {
            category.key = key++
            category.text = category.name
            category.value = category.name
          })
          setCategoryFilter(category.categories)
        }

        console.log('category', category)
      } catch (err) {
        console.log(err.response.data)
        if (err.status === 401 && err.message === 'authorization_failed') {
          getToken(getInitData)
        } else
          notification.error({
            message: `Error`,
            description: `${err.message}`,
            placement: `bottomRight`,
            duration: 1.5,
          })
      }
    }
    getInitData()
  }, [houseId])

  // add a house image

  const handleAddHouseImage = async (values) => {
    // const values = form.validateFields()
    const categoryId = categoryFilter.find((element) => element.value === values.category)._id
    const descImage = values.description

    // console.log('houseid', houseId)
    console.log('categoryId', categoryId)

    const postedData = {}
    // phai dung key
    postedData.categoryId = categoryId
    postedData.descImage = descImage
    postedData.image = houseImage[0].originFileObj

    console.log('postedData', postedData)
    const addImageRequest = async () => {
      try {
        console.log('try')
        console.log('postedData', postedData)
        const res = await createHouseImage(houseId, postedData)

        console.log('run add image')

        if (res) {
          console.log('if ok ')
          const data = await getHouseImages(houseId)
          if (data) {
            console.log(data)
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
              duration: 1.5,
            })
          }
        }
      } catch (err) {
        console.log(err)
        if (err.status === 401 && err.message === 'authorization_failed') {
          getToken(addImageRequest)
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
            duration: 1.5,
          })
        }
      }
    }
    addImageRequest()
    setHouseImage([])
  }

  // delete a houseImage
  const handleDeleteHouseFile = (imageId) => {
    Modal.confirm({
      title: `Delete House Image`,
      icon: <ExclamationCircleOutlined />,
      content: `You are going to delete house image? Are you sure you want to do this? You can't reverse this`,
      async onOk() {
        // Cach duoi danh cho nut Delete ben trong modal update
        // const values = await form.validateFields()
        // // lay tu form item
        // const fileId = values._id
        const deleteFileData = async () => {
          try {
            const res = await deleteHouseImage(imageId)
            console.log('res delete', res)

            if (res) {
              const data = await getHouseImages(houseId)

              if (data.images) {
                console.log('new data')
                let key = 1

                data.images.forEach((image) => {
                  image.key = key++
                })

                setData(data.images)
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
            console.log(err)
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
          description: `Cancel delete house image`,
          placement: `bottomRight`,
          duration: 1.5,
        })
        setVisible(false)
      },
      centered: true,
    })
  }

  // update houseImage_Img
  const handleImageChange = ({ fileList: newFileList }) => {
    if (isUpdate) {
      Modal.confirm({
        title: `Change House Avatar`,
        icon: <ExclamationCircleOutlined />,
        content: `You are going to change this house avatar. Are you sure you want to do this? You can't reverse this`,
        async onOk() {
          const imgId = form.getFieldValue('_id')

          console.log('imgId', imgId)
          console.log(newFileList)
          const data = {}
          data.image = newFileList[0].originFileObj
          console.log(newFileList[0].originFileObj)
          const changeHouseImageRequest = async () => {
            try {
              console.log('try')
              const res = await updateHouseImage_Img(imgId, data)
              if (res) {
                console.log('res')
                const data = await getHouseImages(houseId)
                if (data.images) {
                  console.log('update new data')
                  let key = 1
                  data.images.forEach((category) => {
                    category.key = key++
                  })
                  setData(data.images)
                  setHouseImage((prev) => [...newFileList])

                  console.log('data.iamges', data.images)
                }
                notification.success({
                  message: `Notification`,
                  description: `${res.message}`,
                  placement: `bottomRight`,
                  duration: 1.5,
                })
              }
            } catch (err) {
              console.log(err)
              if (err.status === 401 && err.message === 'authorization_failed') {
                getToken(changeHouseImageRequest)
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
          changeHouseImageRequest()
        },
        onCancel() {
          notification.info({
            message: `Notification`,
            description: `Cancel Change House Image`,
            placement: `bottomRight`,
            duration: 1.5,
          })
          // setVisible(false)
        },
        centered: true,
      })
    } else {
      setHouseImage((prev) => [...newFileList])
    }
  }

  // update houseImage_Info
  const handleUpdate = async () => {
    // lay tu form item
    const values = await form.validateFields()

    console.log('values', values)

    const imgId = values._id
    // const imgId = form.getFieldValue('_id')

    let category = categoryFilter.find((element) => element.value === values.category)

    if (!category)
      category = categoryFilter.find((element) => element.value === values.category.text)

    console.log('categoryFilter', categoryFilter)

    console.log(category)
    const descImage = values.description

    const postedData = {}
    // phai dung key
    postedData.categoryId = category._id
    postedData.descImage = descImage

    const changeHouseImageInfo = async () => {
      try {
        const res = await updateHouseImage_Info(imgId, postedData)
        console.log('run update image info')
        if (res) {
          const data = await getHouseImages(houseId)
          if (data.images) {
            console.log('update new data')
            let key = 1
            data.images.forEach((image) => {
              image.key = key++
            })
            setData(data.images)
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
        // console.log(err.response.data)
        if (err.status === 401 && err.message === 'authorization_failed') {
          console.log('get token')
          getToken(changeHouseImageInfo)
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
            duration: 1.5,
          })
        }
      }
    }
    changeHouseImageInfo()
  }

  const handleBeforeUpload = () => {
    return false
  }

  return (
    <CRow>
      <Modal
        style={{ marginTop: ' 50px ' }}
        open={visible}
        title={formTitle}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <Form form={form} {...formItemLayout} name="form_in_modal" onFinish={handleAddHouseImage}>
          <Form.Item name="_id" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="url" label={"House's Image"}>
            <Upload
              fileList={houseImage}
              beforeUpload={handleBeforeUpload}
              onChange={handleImageChange}
              listType="picture-card"
              maxCount={1}
            >
              {houseImage.length > 1 ? null : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item
            name="category"
            label={"House's Category"}
            rules={[
              {
                required: true,
                message: "Please enter the house's category!",
              },
            ]}
          >
            <Select placeholder={'Please select category'}>
              {categoryFilter?.map((category) => (
                <Option value={category.value} key={category._id} />
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
            {!isUpdate ? (
              <Button
                type="primary"
                htmlType="submit"
                // onClick={() => {
                //   handleAddHouseImage()
                // }}
                style={{ marginRight: 8 }}
              >
                {'Submit'}
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={() => {
                  // setIsUpdate(false)
                  handleUpdate()
                }}
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
          <CCardHeader>House Images</CCardHeader>
          <CCardBody>
            <Button
              type="primary"
              style={{ marginBottom: 16 }}
              onClick={() => {
                setVisible(true)
                setIsUpdate(false)
                setFormTitle('Add Image')
                form.resetFields()
                setHouseImage((prev) => [])
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
    </CRow>
  )
}

export default HouseImage
