import { AxiosConfig } from '../config/AxiosConfig'

// Area
export const getAreaCategories = async () => {
  const axios = AxiosConfig()
  let api = `/category/area/list-categories`
  try {
    const res = await axios.get(api)
    return res.data
  } catch (err) {
    throw err.response.data
  }
}

export const addAreaCategory = async (data) => {
  const axios = AxiosConfig()
  let api = `/category/area/add-category`
  try {
    const res = await axios.post(api, data)
    return res.data
  } catch (err) {
    throw err.response.data
  }
}

export const updateAreaCategory = async (categoryId, data) => {
  const axios = AxiosConfig()
  let api = `/category/area/category-detail/${categoryId}`
  try {
    const res = await axios.put(api, data)
    return res.data
  } catch (err) {
    throw err.response.data
  }
}

export const deleteAreaCategory = async (categoryId) => {
  const axios = AxiosConfig()
  let api = `/category/area/delete-category/${categoryId}`
  try {
    const res = await axios.delete(api)
    return res.data
  } catch (err) {
    throw err.response.data
  }
}

// House
export const getHouseCategories = async (houseId) => {
  // TODO : pass param house id vao api
  const axios = AxiosConfig()
  let api = `/category/house/list-categories`
  try {
    const res = await axios.get(api)
    return res.data
  } catch (err) {
    throw err.response.data
  }
}

export const addHouseCategory = async (data) => {
  const axios = AxiosConfig()
  let api = `/category/house/add-category`
  try {
    const res = await axios.post(api, data)
    return res.data
  } catch (err) {
    throw err.response.data
  }
}

export const updateHouseCategory = async (categoryId, data) => {
  const axios = AxiosConfig()
  let api = `/category/house/category-detail/${categoryId}`
  try {
    const res = await axios.put(api, data)
    return res.data
  } catch (err) {
    throw err.response.data
  }
}

export const deleteHouseCategory = async (categoryId) => {
  const axios = AxiosConfig()
  let api = `/category/house/delete-category/${categoryId}`
  try {
    const res = await axios.delete(api)
    return res.data
  } catch (err) {
    throw err.response.data
  }
}
