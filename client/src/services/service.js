import { AxiosConfig } from "../config/AxiosConfig";


export const getAreaServices = async (areaId) => {
  const axios = AxiosConfig();
  let api = `/file/area/list-files/${areaId}`;
  try {
    const res = await axios.get(api);
    return res.data;
  } catch (e) {
    throw e.response.data;
  }
};
