import React from 'react'
import { AxiosConfig } from '../config/AxiosConfig'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { notification, Modal } from 'antd'

export function isLoggedIn() {
  return !!localStorage.getItem(`${process.env.REACT_APP_PREFIX_LOCAL}_user`)
}

export function getAllowedRoute(routes, role) {
  var allowedData = []
  routes.forEach((route) => {
    if (route.permission) {
      if (route.permission.includes(role)) {
        allowedData.push(route)
      }
    } else {
      allowedData.push(route)
    }
  })
  return allowedData
}

export function getAllowedNav(navigation, role) {
  var allowedData = []
  navigation.forEach((nav) => {
    if (nav.permission) {
      if (nav.permission.includes(role)) {
        if (nav.items) {
          nav.items.forEach((child, index) => {
            if (child.permission && !child.permission.includes(role)) {
              nav.items.splice(index, 1)
            }
          })
        }

        allowedData.push(nav)
      }
    } else {
      if (nav.items) {
        nav.items.forEach((child, index) => {
          if (child.permission && !child.permission.includes(role)) {
            nav.items.splice(index, 1)
          }
        })
      }

      allowedData.push(nav)
    }
  })
  return allowedData
}

// TODO : cap nhat khi chuc nang hoan chinh
export function storeUserData(data) {
  const user = {
    role: data.role,
    // data cua user tu login
    id: data.userId /*'A6tH7BmMLmYsgEyFMPlB26pzaJ13'*/,
  }

  localStorage.setItem(`${process.env.REACT_APP_PREFIX_LOCAL}_user`, JSON.stringify(user))
}

export async function getToken(callback) {
  const axios = AxiosConfig()
  try {
    const res = await axios.post(`${process.env.REACT_APP_API}/api/auth/refresh-token`, {
      refreshToken: localStorage.getItem(`${process.env.REACT_APP_PREFIX_LOCAL}_refresh_token`),
    })

    localStorage.setItem(`${process.env.REACT_APP_PREFIX_LOCAL}_access_token`, res.data.accessToken)
    callback()
  } catch (err) {
    if (err.response) {
      if (err.response.status === 401 || err.response.status === 403) {
        Modal.warn({
          title: `Session time out`,
          icon: <ExclamationCircleOutlined />,
          content: `Please logged in again !`,
          centered: true,
          afterClose: logOut,
        })
      }
    }
  }
  /*
  axios
    .post(`${process.env.REACT_APP_API}/api/auth/refresh-token`, {
      refreshToken: localStorage.getItem(`${process.env.REACT_APP_PREFIX_LOCAL}_refresh_token`),
    })
    .then((res) => {
      localStorage.setItem(
        `${process.env.REACT_APP_PREFIX_LOCAL}_access_token`,
        res.data.accessToken,
      )
      callback()
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 401 || err.response.status === 403) {
          logOut()
        }
      }
    }) */
}

export function logOut() {
  localStorage.removeItem(`${process.env.REACT_APP_PREFIX_LOCAL}_user`)
  localStorage.removeItem(`${process.env.REACT_APP_PREFIX_LOCAL}_access_token`)
  localStorage.removeItem(`${process.env.REACT_APP_PREFIX_LOCAL}_refresh_token`)
  localStorage.removeItem(`persist:root`)
  window.location.href = '/login'
}
