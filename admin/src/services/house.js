import { AxiosConfig } from '../config/AxiosConfig'

export const getHouseList = async (areaId) => {
  const axios = AxiosConfig()
  let api = `/house/list-houses/${areaId}`
  try {
    const res = await axios.get(api)
    return res.data
  } catch (e) {
    throw e.response.data
  }
}

export const getHouseDetail = async (houseId) => {
  const axios = AxiosConfig()
  let api = `/house/house-detail/${houseId}`
  try {
    const res = await axios.get(api)
    return res.data
  } catch (e) {
    throw e.response.data
  }
}

export const createHouse = async (areaId, data) => {
  const axios = AxiosConfig()

  let api = `/house/add-house/${areaId}`
  try {
    const res = await axios.post(api, data, {
      headers: {
        'Content-Type': `multipart/form-data;`,
      },
    })
    return res.data
  } catch (err) {
    throw err.response.data
  }
}

export const updateHouse_Info = async (houseId, data) => {
  const axios = AxiosConfig()
  let api = `/house/house-detail/${houseId}`

  try {
    const res = await axios.put(api, data, {
      'Content-Type': `application/json`,
    })
    return res.data
  } catch (err) {
    throw err.response.data
  }
}

export const updateHouse_Avatar = async (houseId, data) => {
  const axios = AxiosConfig()
  let api = `/house/change-avatar/${houseId}`

  try {
    const res = await axios.put(api, data, {
      headers: {
        'Content-Type': `multipart/form-data;`,
      },
    })
    return res.data
  } catch (err) {
    throw err.response.data
  }
}

export const deleteHouse = async (areaId) => {
  const axios = AxiosConfig()
  let api = `/house/delete-house/${areaId}`
  try {
    const res = await axios.delete(api)
    return res.data
  } catch (err) {
    throw err.response.data
  }
}
