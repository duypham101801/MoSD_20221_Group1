import { AxiosConfig } from "../config/AxiosConfig";

const axios = AxiosConfig();
export const getHouseList = async (areaId) => {
 
  let api = `/house/list-houses/${areaId}`;
  try {
    const res = await axios.get(api);
    return res.data;
  } catch (e) {
    throw e.response.data;
  }
};

export const getHouseDetail = async (houseId) => {
 ;
  let api = `/house/house-detail/${houseId}`;
  try {
    const res = await axios.get(api);
    return res.data;
  } catch (e) {
    throw e.response.data;
  }
};

