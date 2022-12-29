import axios from "axios";

export const AxiosConfig = () => {
  // const token = localStorage.getItem(`${process.env.REACT_APP_PREFIX_LOCAL}_access_token`);
  const instance = axios.create({
    // baseURL: `http://localhost:5000/api`,
    baseURL: `${process.env.REACT_APP_API}`,
    headers: {
      // works
      authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN_SECRET}`,
     
    },
  });
   
  return instance;
};
