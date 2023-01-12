import axios from 'axios'
import { AxiosConfig } from '../config/AxiosConfig'
import { getToken } from './auth'

export function register(data, callback) {
  axios
    .post(`${process.env.REACT_APP_API}/api/users/register`, data)
    .then((res) => {
      callback(res.data)
    })
    .catch((err) => {
      if (err.response) {
        callback(err.response.data)
      }
    })
}

export function getProfiles(id, callback) {
  const axiosConfig = AxiosConfig()

  axiosConfig
    .get(`/users/${id}`)
    .then((res) => {
      callback(res.data)
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(getProfile(id, callback))
        } else {
          callback(err.response.data)
        }
      }
    })
}

//res.user
export const getProfile = async () => {
  const axios = AxiosConfig()
  let api = `/auth/profile`
  try {
    const res = await axios.get(api)
    return res.data
  } catch (err) {
    throw err.response.data
  }
}

// name,phone
export const updateProfile = async (data) => {
  const axios = AxiosConfig()
  let api = `/auth/profile`
  try {
    const res = await axios.put(api, data)
    return res.data
  } catch (err) {
    throw err.response.data
  }
}

export const getUser = () => {
  return JSON.parse(localStorage.getItem(`${process.env.REACT_APP_PREFIX_LOCAL}_user`))
}

/*  send api language
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
} */
