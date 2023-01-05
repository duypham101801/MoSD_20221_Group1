import { AxiosConfig } from "../config/AxiosConfig";

const axios = AxiosConfig();

export const getProvinceList = async () => {
 
  let api = `/location/list-provinces`;
  try {
    const res = await axios.get(api);
    return res.data;
  } catch (e) {
    return e.response.data;
  }
};

export const getDistrictList = async (provinceName) => {
 
  let api = `/location/list-districts?provinceName=${provinceName}`;
  try {
    const res = await axios.get(api);
    return res.data;
  } catch (e) {
    return e.response.data;
  }
};

