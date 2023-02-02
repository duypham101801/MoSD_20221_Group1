import { AxiosConfig } from '../config/AxiosConfig'

export const getProvinceList = async () => {
  const axios = AxiosConfig()
  let api = `/location/list-provinces`
  try {
    const res = await axios.get(api)
    return res.data
  } catch (e) {
    return e.response.data
  }
}

export const getDistrictList = async (provinceName) => {
  const axios = AxiosConfig()
  let api = `/location/list-districts?provinceName=${provinceName}`
  try {
    const res = await axios.get(api)
    return res.data
  } catch (e) {
    return e.response.data
  }
}

export const getLocationList = async () => {
  const axios = AxiosConfig()
  let api = `/location/list-locations`
  try {
    const res = await axios.get(api)
    return res.data
  } catch (e) {
    return e.response.data
  }
}
