import { AxiosConfig } from '../config/AxiosConfig'
import { getToken } from './auth'

// listAreas
export const getAreaList = async (data) => {
  const axios = AxiosConfig()
  let api = `/area/list-areas?provinceName=${data.province}&districtName=${data.district}`
  try {
    const res = await axios.get(api)
    return res.data
  } catch (e) {
    throw e.response.data
  }
}

export const getAreaDetail = async (areaId) => {
  const axios = AxiosConfig()
  let api = `/area/area-detail/${areaId}`
  try {
    const res = await axios.get(api)
    return res.data
  } catch (e) {
    throw e.response.data
  }
}

//data la object
export const createArea = async (data) => {
  const axios = AxiosConfig()
  let api = `/area/add-area`
  try {
    const res = await axios.post(api, data, {
      headers: {
        'Content-Type': `multipart/form-data;`,
      },
    })
    return res.data
  } catch (err) {
    throw err.response.data //  cors
  } /*catch (err) {
    if (err.response) {
      if (err.response.status === 401) {
        getToken(createArea(data))
      } else {
        throw err.response.data
      }
    }
  }*/
}

export const updateArea = async (areaId, data) => {
  const axios = AxiosConfig()
  let api = `/area/area-detail/${areaId}`
  try {
    const res = await axios.put(api, data)
    return res.data
  } catch (err) {
    throw err.response.data
  }
}

export const deleteArea = async (areaId) => {
  const axios = AxiosConfig()
  let api = `/area/delete-area/${areaId}`
  try {
    const res = await axios.delete(api)
    return res.data
  } catch (err) {
    throw err.response.data
  }
}

export const changeAreaAvatar = async (areaId, data) => {
  const axios = AxiosConfig()
  let api = `/area/change-avatar/${areaId}`
  try {
    const res = await axios.put(api, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return res.data
  } catch (err) {
    throw err.response.data
  }
}

export const getProvinces = async () => {
  const axios = AxiosConfig()
  let api = `/location/provinces-api/provinces`
  try {
    const res = await axios.get(api)
    return res.data
  } catch (err) {
    throw err.response.data
  }
}
export const getDistricts = async (provinceId) => {
  const axios = AxiosConfig()
  let api = `/location/provinces-api/districts?provinceId=${provinceId}`
  try {
    const res = await axios.get(api)
    return res.data
  } catch (err) {
    throw err.response.data
  }
}
