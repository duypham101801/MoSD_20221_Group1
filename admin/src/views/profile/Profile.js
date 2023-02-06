import React, { useEffect, useState } from 'react'
import { Button, Descriptions, notification, Form, Modal, Input } from 'antd'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import { getProfile, updateProfile } from 'src/services/user'
import { getToken } from 'src/services/auth'
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
function Profile() {
  const [data, setData] = useState({})
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const getProf = async () => {
      try {
        const res = await getProfile()
        setData(res.user)
      } catch (err) {
        if (err.status === 401 && err.message === 'authorization_failed') {
          getToken(getProf)
        } else
          notification.error({
            message: `Error`,
            description: `${err.message}`,
            placement: `bottomRight`,
            duration: 1.5,
          })
      }
    }
    getProf()
  }, [])
  const handleClick = () => {
    setVisible(true)
    form.resetFields()
    form.setFields({
      name: data.name,
      phone: data.phone,
    })
  }
  const onUpdate = async () => {
    const values = await form.validateFields()
    const updateProf = async () => {
      try {
        const res = await updateProfile(values)
        if (res) {
          const data = await getProfile()
          if (data) {
            setData(data.user)
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
          getToken(updateProf)
        } else
          notification.error({
            message: `Error`,
            description: `${err.message}`,
            placement: `bottomRight`,
            duration: 1.5,
          })
      }
    }
    updateProf()
  }
  return (
    <>
      <CRow className="justify-content-center">
        <Modal
          style={{ marginTop: ' 100px ' }}
          centered={true}
          open={visible}
          title={'Update profile'}
          footer={null}
          onCancel={() => setVisible(false)}
        >
          <Form form={form} {...formItemLayout} name="form_in_modal">
            <Form.Item
              name="name"
              label={'Name'}
              rules={[
                {
                  required: true,
                  message: 'Please enter name!',
                },
              ]}
            >
              <Input placeholder={'Please enter name'} />
            </Form.Item>
            <Form.Item
              name="phone"
              label={'Phone'}
              rules={[
                {
                  required: true,
                  message: 'Please enter phone!',
                },
              ]}
            >
              <Input placeholder={'Please enter phone'} />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button
                type="primary"
                htmlType="button"
                onClick={() => onUpdate()}
                style={{ marginRight: '8px' }}
              >
                {'Update'}
              </Button>
              <Button htmlType="button" onClick={() => setVisible(false)}>
                {'Cancel'}
              </Button>{' '}
            </Form.Item>
          </Form>
        </Modal>
        <CCol xs="12" sm="12">
          <CCard>
            <CCardBody>
              {data && (
                <Descriptions title={"User's Info"} bordered>
                  <Descriptions.Item label={'Username'} span={3}>
                    {data.name}
                  </Descriptions.Item>
                  <Descriptions.Item label={'Phone'} span={3}>
                    {data.phone}
                  </Descriptions.Item>
                  <Descriptions.Item label={'E-mail'} span={3}>
                    {data.email}
                  </Descriptions.Item>
                  <Descriptions.Item label={'Role'} span={3}>
                    {data.role}
                  </Descriptions.Item>
                </Descriptions>
              )}
              <Button
                type="primary"
                htmlType="button"
                style={{ marginRight: '8px', marginTop: '15px' }}
                onClick={handleClick}
              >
                {'Update'}
              </Button>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Profile
