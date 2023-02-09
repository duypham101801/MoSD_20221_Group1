import React, { useEffect, useState } from 'react'
import { CCol, CRow, CCard, CCardBody, CCardHeader } from '@coreui/react'
import { useParams } from 'react-router'

import { getHouseDetail, updateHouse_Avatar, updateHouse_Info } from 'src/services/house'
import { Input, Select, Button, Form, Upload, notification, Modal } from 'antd'
import { uploadButton } from 'src/components/area-details/area-info/AreaInfo'
import { getToken } from 'src/services/auth'
import { ExclamationCircleOutlined } from '@ant-design/icons'

const formItemLayout = {
  labelCol: {
    xs: { span: 2 },
    sm: { span: 4 },
    md: { span: 3 },
    //sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 22 },
    sm: { span: 18 },
    md: { offset: 1 },
  },
}

const { Option } = Select
const { TextArea } = Input
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
}

function HouseInfo() {
  const [data, setData] = useState()
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)

  const [houseAvatar, setHouseAvatar] = useState([])

  const { id: houseId } = useParams()

  const setFormData = (data) => {
    form.resetFields()
    form.setFieldsValue({
      houseName: data.name,
      urlAvatar: data.urlAvatar,
      houseType: data.type,
      housePrice: data.price,
      houseInfo: data.info,
      houseCount: data.count,
    })
  }

  useEffect(() => {
    const getHouseInfo = async () => {
      try {
        const res = await getHouseDetail(houseId)
        if (res.house) {
          setData(res.house)
          setFormData(res.house)
          setHouseAvatar([
            { uid: '-1', status: 'done', url: res.house.urlAvatar, name: 'house.png' },
          ])
        }
      } catch (err) {
        if (err.status === 401 && err.message === 'authorization_failed') {
          getToken(getHouseInfo)
        } else
          notification.error({
            message: `Error`,
            description: `${err.message}`,
            placement: `bottomRight`,
            duration: 1.5,
          })
      }
    }
    getHouseInfo()
  }, [houseId])

  const onUpdate = async () => {
    const values = await form.validateFields()

    const postedData = { ...values }

    const updateHouseRequest = async () => {
      try {
        const res = await updateHouse_Info(houseId, postedData)
        if (res) {
          notification.success({
            message: `Notification`,
            description: `${res.message}`,
            placement: `bottomRight`,
            duration: 1.5,
          })
        }
      } catch (err) {
        if (err.status === 401 && err.message === 'authorization_failed') {
          getToken(updateHouseRequest)
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
    updateHouseRequest()
  }

  const handleHouseAvatarChange = ({ fileList: newFileList }) => {
    /*
    setHouseAvatar(newFileList)

    const data = {}
    data.avatar = newFileList[0].originFileObj
    const changeHouseAvatar = async () => {
      try {
        const res = await updateHouse_Avatar(houseId, data)
        if (res) {
          notification.success({
            message: `Notification`,
            description: `${res.message}`,
            placement: `bottomRight`,
            duration: 1.5,
          })
        }
      } catch (err) {
        if (err.status === 401 && err.message === 'authorization_failed') {
          getToken(changeHouseAvatar)
        } else
          notification.error({
            message: `Error`,
            description: `${err.message}`,
            placement: `bottomRight`,
            duration: 1.5,
          })
      }
    }
    changeHouseAvatar() 
    
    */

    Modal.confirm({
      title: `Delete Area Category`,
      icon: <ExclamationCircleOutlined />,
      content: `You are going to change this house avatar. Are you sure you want to do this? You can't reverse this`,
      async onOk() {
        setHouseAvatar(newFileList)

        const data = {}
        data.avatar = newFileList[0].originFileObj
        const changeHouseAvatar = async () => {
          try {
            const res = await updateHouse_Avatar(houseId, data)
            if (res) {
              notification.success({
                message: `Notification`,
                description: `${res.message}`,
                placement: `bottomRight`,
                duration: 1.5,
              })
            }
          } catch (err) {
            if (err.status === 401 && err.message === 'authorization_failed') {
              getToken(changeHouseAvatar)
            } else {
              form.setFields([
                {
                  name: 'urlAvatar',
                  errors: [`${err.validationErrors?.avatar}`],
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
        changeHouseAvatar()
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

  const handleBeforeUpload = () => {
    return false
  }

  return (
    <CRow>
      <CCol xs="12" md="12" className="mb-4">
        <CCard>
          <CCardHeader>{'House Detail'}</CCardHeader>
          <CCardBody>
            <Form form={form} {...formItemLayout} name="form_in_modal">
              <Form.Item
                name="houseName"
                label={`House Name`}
                rules={[
                  {
                    required: true,
                    message: 'Please enter house name!',
                  },
                ]}
              >
                <Input placeholder={'Please enter house name'} />
              </Form.Item>
              <Form.Item
                name="urlAvatar"
                label={'House Avatar'}
                rules={[
                  {
                    required: true,
                    message: 'Please enter House Avatar!',
                  },
                ]}
              >
                {/* <img src={data?.urlAvatar} style={{ width: '50%', height: '50%' }} /> */}
                <Upload
                  fileList={houseAvatar}
                  beforeUpload={handleBeforeUpload}
                  onChange={handleHouseAvatarChange}
                  listType="picture-card"
                  maxCount={1}
                >
                  {houseAvatar.length > 1 ? null : uploadButton}
                </Upload>
              </Form.Item>{' '}
              <Form.Item
                name="houseType"
                label={'Hosue Type'}
                rules={[
                  {
                    required: true,
                    message: 'Please enter house type!',
                  },
                ]}
              >
                <Input placeholder={'Please enter house type'} />
              </Form.Item>{' '}
              <Form.Item
                name="housePrice"
                label={'House Price'}
                rules={[
                  {
                    required: true,
                    message: 'Please enter price!',
                  },
                ]}
              >
                <Input placeholder={'Please enter house price'} />
              </Form.Item>{' '}
              <Form.Item
                name="houseInfo"
                label={'House Information'}
                rules={[
                  {
                    required: true,
                    message: 'Please enter house information !',
                  },
                ]}
              >
                <TextArea rows={4} />
              </Form.Item>{' '}
              <Form.Item
                name="houseCount"
                label={'House Count'}
                rules={[
                  {
                    required: true,
                    message: 'Please enter house count!',
                  },
                ]}
              >
                <Input placeholder={'Please enter house count'} />
              </Form.Item>{' '}
              <Form.Item {...tailLayout}>
                <Button
                  type="primary"
                  htmlType="button"
                  onClick={() => onUpdate()}
                  style={{ marginRight: '8px' }}
                >
                  {'Update'}
                </Button>
                <Button
                  htmlType="button"
                  type="danger"
                  onClick={() => {
                    form.resetFields()
                    setFormData(data)
                  }}
                >
                  {'Reset'}
                </Button>{' '}
              </Form.Item>
            </Form>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default HouseInfo
