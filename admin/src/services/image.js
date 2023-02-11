import { AxiosConfig } from '../config/AxiosConfig'

const groupBy = (array, key) => {
  return array.reduce((result, currentValue) => {
    ;(result[currentValue.category] = result[currentValue.category] || []).push(currentValue)
    return result
  }, {})
}
export const getAreaImages = async (areaId) => {
  const axios = AxiosConfig()
  let api = `/image/area/list-images-v1/${areaId}`
  try {
    const res = await axios.get(api)
    // can group iamge theo cate
    // const data = groupBy(res.data.listImages, 'category')
    return res.data
  } catch (e) {
    throw e.response.data
  }
}
/*
{
  "listImages": [
    {
      "_id": "635738606881536ea399f366",
      "url": "https://nghiduongngoaio.com/wp-content/uploads/2021/06/cover-night-out-003-1536x1024.jpg",
      "description": "Ảnh ban đêm",
      "category": "Ảnh Quang Cảnh"
    },
    {
      "_id": "6357388e6881536ea399f36b",
      "url": "https://nghiduongngoaio.com/wp-content/uploads/2021/06/cover-morning-out-002-1536x1024.jpg",
      "description": "Ảnh ban ngày",
      "category": "Ảnh Quang Cảnh"
    }
  ]
}
*/
export const getHouseImages = async (houseId) => {
  const axios = AxiosConfig()
  let api = `/image/house/list-images-v1/${houseId}`
  try {
    const res = await axios.get(api)
    // can group iamge theo cate
    // const data = groupBy(res.data.listImages, 'category')
    return res.data
  } catch (e) {
    throw e.response.data
  }
}

export const createAreaImage = async (areaId, data) => {
  const axios = AxiosConfig()
  let api = `/image/area/add-image/${areaId}`
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

export const updateAreaImage = async (areaId, data) => {
  const axios = AxiosConfig()

  let api = `/image/area/image-detail/${areaId}`
  try {
    const res = await axios.put(api, data)
    return res.data
  } catch (err) {
    throw err.response.data
  }
}

export const changeAreaImg = async (areaId, data) => {
  const axios = AxiosConfig()
  const formData = new FormData()
  formData.append('image', data)
  let api = `/image/area/change-image/${areaId}`
  try {
    const res = await axios.put(api, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return res.data
  } catch (err) {
    throw err.response.data
  }
}

export const deleteAreaImage = async (imageId) => {
  const axios = AxiosConfig()
  let api = `/image/area/delete-image/${imageId}`
  try {
    const res = await axios.delete(api)
    return res.data
  } catch (err) {
    throw err.response.data
  }
}

export const createHouseImage = async (houseId, data) => {
  const axios = AxiosConfig()
  let api = `/image/house/add-image/${houseId}`
  try {
    const res = await axios.post(api, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        // 'Content-Type': 'application/json',
      },
    })
    return res.data
  } catch (err) {
    throw err.response.data
  }
}

export const updateHouseImage_Info = async (houseId, data) => {
  const axios = AxiosConfig()
  let api = `/image/house/image-detail/${houseId}`
  try {
    const res = await axios.put(api, data)
    return res.data
  } catch (err) {
    throw err.response.data
  }
}

export const updateHouseImage_Img = async (houseId, data) => {
  const axios = AxiosConfig()
  let api = `/image/house/change-image/${houseId}`
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

export const deleteHouseImage = async (imageId) => {
  const axios = AxiosConfig()
  let api = `/image/house/delete-image/${imageId}`
  try {
    const res = await axios.delete(api)
    return res.data
  } catch (err) {
    throw err.response.data
  }
}
