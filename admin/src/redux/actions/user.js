import { Actions } from '../../config/Actions'
import { AxiosConfig } from '../../config/AxiosConfig'
import { notification } from 'antd'
import axios from 'axios'
import { getToken } from 'src/services/auth'

export function login(data) {
  return async function loginThunk(dispatch, getState) {
    await axios
      .post(`${process.env.REACT_APP_API}/api/auth/login`, data)
      .then((res) => {
        localStorage.setItem(
          `${process.env.REACT_APP_PREFIX_LOCAL}_access_token`,
          res.data.accessToken,
        )
        localStorage.setItem(
          `${process.env.REACT_APP_PREFIX_LOCAL}_refresh_token`,
          res.data.refreshToken,
        )
        notification.success({
          message: `Notification`,
          description: `Login Successful`,
          placement: 'topRight',
          duration: 2,
        })
        dispatch({
          type: Actions.LOGIN_SUCCESS,
          payload: {
            user: res.data,
            message: '',
          },
        })
      })
      .catch((err) => {
        if (err.response) {
          notification.error({
            message: `Notification`,
            description: `${err.response.data.message}`,
            placement: 'topRight',
            duration: 2,
          })
          dispatch({
            type: Actions.LOGIN_FAIL,
            payload: {
              message: err.response.data.message,
            },
          })
        }
      })
  }
}

export function changeLanguage(language, callback) {
  return async function languageThunk(dispatch, getState) {
    const axiosConfig = AxiosConfig()

    await axiosConfig
      .get(`${process.env.REACT_APP_API}/api/language?lang=${language}`)
      .then((res) => {
        dispatch({
          type: Actions.CHANGE_LANGUAGE_SUCCESS,
          payload: {
            language: res.data.language,
            message: '',
          },
        })
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 403) {
            getToken(changeLanguage(language, callback))
          } else {
            dispatch({
              type: Actions.CHANGE_LANGUAGE_FAIL,
              payload: {
                message: err.response.data.message,
              },
            })
          }
        }
      })
  }
}

export function logout(data) {
  return async function logoutThunk(dispatch, getState) {
    const axiosConfig = AxiosConfig()

    await axiosConfig
      .post(`/users/logout`)
      .then((res) => {
        localStorage.removeItem(`${process.env.REACT_APP_PREFIX_LOCAL}_user`)
        localStorage.removeItem(`${process.env.REACT_APP_PREFIX_LOCAL}_access_token`)
        localStorage.removeItem(`${process.env.REACT_APP_PREFIX_LOCAL}_refresh_token`)

        dispatch({
          type: Actions.LOGOUT_SUCCESS,
        })
      })
      .catch((err) => {
        if (err.response) {
          dispatch({
            type: Actions.LOGOUT_FAIL,
          })
        }
      })
  }
}
