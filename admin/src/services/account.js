import { AxiosConfig } from '../config/AxiosConfig'
import { getToken } from './auth'

// listaccounts
export const getAccountList = async () => {
  const axios = AxiosConfig()
  let api = `/account/list-accounts`
  try {
    const res = await axios.get(api)
    return res.data
  } catch (e) {
    throw e.response.data
  }
}

export const getAccountDetail = async (accountId) => {
  const axios = AxiosConfig()
  let api = `/account/account-detail/${accountId}`
  try {
    const res = await axios.get(api)
    return res.data
  } catch (e) {
    throw e.response.data
  }
}

//data la object
export const createAccount = async (data) => {
  const axios = AxiosConfig()
  let api = `/account/create-account`

  try {
    const res = await axios.post(api, data)
    return res.data
  } catch (err) {
    throw err.response.data
  } /*catch (err) {
    if (err.response) {
      if (err.response.status === 401) {
        getToken(createaccount(data))
      } else {
        throw err.response.data
      }
    }
  }*/
}

export const updateAccount = async (accountId, data) => {
  const axios = AxiosConfig()
  let api = `/account/account-detail/${accountId}`
  try {
    const res = await axios.put(api, data)
    return res.data
  } catch (err) {
    throw err.response.data
  }
}

export const deleteAccount = async (accountId) => {
  const axios = AxiosConfig()
  let api = `/account/delete-account/${accountId}`
  try {
    const res = await axios.delete(api)
    return res.data
  } catch (err) {
    throw err.response.data
  }
}
