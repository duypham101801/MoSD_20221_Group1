import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { storeUserData } from 'src/services/auth'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { login } from 'src/redux/actions/user'
import Modal from '../../../components/modal/Modal'
import { Form, Input, Button, Checkbox, message, Radio } from 'antd'
import { PhoneOutlined, LockOutlined } from '@ant-design/icons'
import { Roles } from '../../../config/Roles'

var _ = require('lodash')
const Login = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()

  const onFinish = (values) => {
    const data = {}
    data.email = values.email
    data.password = values.password
    data.role = values.role
    const loginThunk = login(data)
    dispatch(loginThunk)
  }
  useEffect(() => {
    if (!_.isEmpty(user.data)) {
      storeUserData(user.data)
      navigate('/')
    }
  }, [user])
  return (
    <>
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={5}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <h2 style={{ marginBottom: '10px' }}>Travelo ADMIN</h2>
                    <Form name="normal_login" className="login-form" onFinish={onFinish}>
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your email!',
                          },
                        ]}
                      >
                        <Input
                          prefix={<PhoneOutlined className="site-form-item-icon" />}
                          placeholder={'Email'}
                        />
                      </Form.Item>
                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your Password!',
                          },
                        ]}
                      >
                        <Input
                          prefix={<LockOutlined className="site-form-item-icon" />}
                          type="password"
                          placeholder={'Password'}
                        />
                      </Form.Item>
                      <Form.Item
                        name="role"
                        rules={[
                          {
                            required: true,
                            message: 'Please select role',
                          },
                        ]}
                      >
                        <Radio.Group>
                          <Radio value={Roles.ADMIN}>{'Admin'}</Radio>
                          <Radio value={Roles.SALE}>{'Sale'}</Radio>
                          <Radio value={Roles.EDITOR}>{'Editor'}</Radio>
                        </Radio.Group>
                      </Form.Item>
                      <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                          <Checkbox>{'Remember me'}</Checkbox>
                        </Form.Item>

                        {/*<Link className="login-form-forgot float-right" to="">
                          {'Forgot password'}
                      </Link>*/}
                      </Form.Item>

                      <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                          {'Login'}
                        </Button>
                      </Form.Item>
                    </Form>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  )
}

export default Login
