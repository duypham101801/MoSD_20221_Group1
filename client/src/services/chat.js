import { AxiosConfig } from "../config/AxiosConfig";
export const getSaleId = async () => {
  const axios = AxiosConfig();
  let api = `/chat/select-sale`;

  try {
    const res = await axios.get(api);
    return res.data;
  } catch (e) {
    throw e.response.data;
  }
};
