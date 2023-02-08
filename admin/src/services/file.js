import { AxiosConfig } from '../config/AxiosConfig'

export const getAreaServices = async (areaId) => {
  const axios = AxiosConfig()
  let api = `/file/area/list-files/${areaId}`
  try {
    const res = await axios.get(api)
    return res.data
  } catch (e) {
    throw e.response.data
  }
}

export const getHouseServices = async (houseId) => {
  const axios = AxiosConfig()
  // TODO : pass param house id vao api
  let api = `/file/house/list-files/635739796881536ea399f376`
  try {
    const res = await axios.get(api)
    return res.data
  } catch (e) {
    throw e.response.data
  }
}

export const createAreaFile = async (areaId, data) => {
  const axios = AxiosConfig()
  let api = `/file/area/add-file/${areaId}`
  try {
    const res = await axios.post(api, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return res.data
  } catch (err) {
    throw err.response.data
  }
}

export const updateAreaFile = async (fileId, data) => {
  const axios = AxiosConfig()
  let api = `/file/area/file-detail/${fileId}`
  try {
    const res = await axios.put(api, data)
    return res.data
  } catch (err) {
    throw err.response.data
  }
}
export const changeAreaThumb = async (fileId, data) => {
  const axios = AxiosConfig()
  let api = `/file/area/change-thumb/${fileId}`
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
export const changeAreaFile = async (fileId, data) => {
  const axios = AxiosConfig()
  let api = `/file/area/change-file/${fileId}`
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

export const deleteAreaFile = async (fileId) => {
  const axios = AxiosConfig()
  let api = `/file/area/delete-file/${fileId}`
  try {
    const res = await axios.delete(api)
    return res.data
  } catch (err) {
    throw err.response.data
  }
}

export const getHouseFile = async (houseId) => {
  const axios = AxiosConfig()
  let api = `/file/house/list-files/${houseId}`
  try {
    const res = await axios.get(api)
    return res.data
  } catch (err) {
    throw err.response.data
  }
}

export const getFileDetail = async (fileId) => {
  const axios = AxiosConfig()
  let api = `/file/house/file-detail/${fileId}`
  try {
    // const res = await axios.delete(api, data)
    const res = await axios.get(api)
    return res.data
  } catch (err) {
    throw err.response.data
  }
}

export const createHouseFile = async (houseId, data) => {
  const axios = AxiosConfig()
  let api = `/file/house/add-file/${houseId}`
  try {
    const res = await axios.post(api, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return res.data
  } catch (err) {
    throw err.response.data
  }
}

export const updateHouseFile = async (fileId, data) => {
  const axios = AxiosConfig()
  let api = `/file/house/file-detail/${fileId}`
  try {
    const res = await axios.put(api, data, {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        'Content-Type': 'application/json',
      },
    })
    return res.data
  } catch (err) {
    throw err.response.data
  }
}

export const updateHouseFileThumb = async (fileId, data) => {
  const axios = AxiosConfig()
  let api = `/file/house/change-thumb/${fileId}`
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

export const updateHouseFileUrl = async (fileId, data) => {
  const axios = AxiosConfig()
  let api = `/file/house/change-file/${fileId}`
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

export const deleteHouseFile = async (fileId) => {
  const axios = AxiosConfig()
  let api = `/file/house/delete-file/${fileId}`
  try {
    // const res = await axios.delete(api, data)
    const res = await axios.delete(api)
    return res.data
  } catch (err) {
    throw err.response.data
  }
}
