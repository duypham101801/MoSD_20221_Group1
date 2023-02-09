/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { CCol, CRow, CCard, CCardBody, CCardHeader } from '@coreui/react'
import { Table, Space, Button, Modal, Form, Input, Select, notification, Upload } from 'antd'

import { getToken } from 'src/services/auth'
import { getAreaDetail, updateArea } from 'src/services/area'
import { PlusOutlined } from '@ant-design/icons'
import { changeAreaAvatar } from 'src/services/area'
import { ExclamationCircleOutlined } from '@ant-design/icons'
export const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
)
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
  },
}
const { Option } = Select
const { TextArea } = Input
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
}

function AreaInfo() {
  const { areaId } = useParams()
  const [data, setData] = useState()
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [fileList, setFileList] = useState([])
  useEffect(() => {
    const getAreaInfo = async () => {
      try {
        const res = await getAreaDetail(areaId)
        if (res.area) {
          setData(res.area)
          setFormData(res.area)
          setFileList([{ uid: '-1', status: 'done', url: res.area.urlAvatar, name: 'area.png' }])
        }
      } catch (err) {
        if (err.status === 401 && err.message === 'authorization_failed') {
          getToken(getAreaInfo)
        } else
          notification.error({
            message: `Error`,
            description: `${err.message}`,
            placement: `bottomRight`,
            duration: 3,
          })
      }
    }
    getAreaInfo()
  }, [])
  const setFormData = (data) => {
    form.resetFields()
    form.setFieldsValue({
      areaName: data.name,
      minPrice: data.minPrice,
      maxPrice: data.maxPrice,
      areaCapacity: data.capacity,
      areaDesc: data.description,
      urlAvatar: data.urlAvatar,
    })
  }
  const handleBeforeUpload = () => {
    //setFileList([...fileList])
    return false
  }
  const onUpdate = async () => {
    const value = await form.validateFields()
    const data = { ...value }
    data.areaVideo = 'SD'

    const update = async () => {
      try {
        const res = await updateArea(areaId, data)
        if (res) {
          notification.success({
            message: `Notification`,
            description: `${res.message}`,
            placement: `bottomRight`,
            duration: 3,
          })
        }
      } catch (err) {
        if (err.status === 401 && err.message === 'authorization_failed') {
          getToken(update)
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
    update()
  }
  const handleImageChange = ({ fileList: newFileList }) => {
    Modal.confirm({
      title: `Update Area Image`,
      icon: <ExclamationCircleOutlined />,
      content: `You are going to update area image? Are you sure you want to do this? You can't reverse this`,
      async onOk() {
        setFileList(newFileList)
        const data = {}
        data.avatar = newFileList[0].originFileObj
        const changeAvatar = async () => {
          try {
            const res = await changeAreaAvatar(areaId, data)
            if (res) {
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
        changeAvatar()
      },
      onCancel() {
        notification.info({
          message: `Notification`,
          description: `Cancel change area avatar`,
          placement: `bottomRight`,
          duration: 3,
        })
        setVisible(false)
      },
      centered: true,
    })
  }
  return (
    <CCol xs={12} className="mb-4">
      <CCard>
        <CCardHeader>{'Area Details'}</CCardHeader>
        <CCardBody>
          <Form form={form} {...formItemLayout} name="form_in_modal">
            <Form.Item
              name="areaName"
              label={`Area's Name`}
              labelAlign="left"
              rules={[
                {
                  required: true,
                  message: 'Please enter area name!',
                },
              ]}
            >
              <Input placeholder={'Please enter area name'} />
            </Form.Item>
            <Form.Item
              name="urlAvatar"
              label={'Area Avatar'}
              labelAlign="left"
              rules={[
                {
                  required: true,
                  message: 'Please enter urlAvatar!',
                },
              ]}
            >
              <Upload
                fileList={fileList}
                beforeUpload={handleBeforeUpload}
                onChange={handleImageChange}
                listType="picture-card"
                onRemove={(file) => {
                  setFileList((state) => {
                    const index = state.indexOf(file)
                    const newFileList = state.slice()
                    newFileList.splice(index, 1)
                    return [...newFileList]
                  })
                }}
                maxCount={1}
              >
                {fileList.length > 1 ? null : uploadButton}
              </Upload>
              {/*<img src={data?.urlAvatar} style={{ width: '50%', height: '50%' }} /> */}
            </Form.Item>{' '}
            <Form.Item
              name="minPrice"
              label={'Min Price'}
              labelAlign="left"
              rules={[
                {
                  required: true,
                  message: 'Please enter min price!',
                },
              ]}
            >
              <Input placeholder={'Please enter price'} />
            </Form.Item>{' '}
            <Form.Item
              name="maxPrice"
              labelAlign="left"
              label={'Max Price'}
              rules={[
                {
                  required: true,
                  message: 'Please enter price!',
                },
              ]}
            >
              <Input placeholder={'Please enter max price'} />
            </Form.Item>{' '}
            <Form.Item
              name="areaCapacity"
              labelAlign="left"
              label={'Capacity'}
              rules={[
                {
                  required: true,
                  message: 'Please enter capacity!',
                },
              ]}
            >
              <Input placeholder={'Please enter capacity'} />
            </Form.Item>{' '}
            <Form.Item
              name="areaDesc"
              label={'Description'}
              labelAlign="left"
              rules={[
                {
                  required: true,
                  message: 'Please enter description!',
                },
              ]}
            >
              <TextArea rows={4} />
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
                  // form.resetFields()
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
  )
}

export default AreaInfo
