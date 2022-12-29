import { AxiosConfig } from "../config/AxiosConfig";

const axios = AxiosConfig();

export const getAreaList = async (data) => {
  let api = "/area/search/results";
  try {
    let query;
    if (!data.districtName || data.districtName === "Tất cả") {
      query = {
        provinceName: data.provinceName,
        minCapacity: data.minCapacity ,
        maxCapacity: data.maxCapacity ,
      };
    } else {
      query = {
        provinceName: data.provinceName,
        districtName: data.districtName,
        minCapacity: data.minCapacity ,
        maxCapacity: data.maxCapacity ,
      };
    }
    const res = await axios.get(api, {
      params: query,
    });
    return res.data;
  } catch (e) {
    throw e.response.data;
  }
};


