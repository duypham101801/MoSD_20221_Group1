import { AxiosConfig } from "../config/AxiosConfig";

const axios = AxiosConfig();
const groupBy = (array, key) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue.category] =
      result[currentValue.category] || []).push(currentValue);
    
    return result;
  }, {});
};
export const getAreaImages = async (areaId) => {
  
  let api = `/image/area/list-images-v1/${areaId}`;
  try {
    const res = await axios.get(api);
    // can group iamge theo cate
    const data =  groupBy(res.data.images,"category");
    return data;
  } catch (e) {
    throw e.response.data;
  }
};
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
  
  let api = `/image/house/list-images-v1/${houseId}`;
  try {
    const res = await axios.get(api);
    // can group iamge theo cate
    const data = groupBy(res.data.images, "category");
    return data;
  } catch (e) {
    throw e.response.data;
  }
};

