import axios from 'axios'

export const AxiosConfig = () => {
  const token = localStorage.getItem(`${process.env.REACT_APP_PREFIX_LOCAL}_access_token`)
  const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API}/api`,

    headers: {
      authorization: `Bearer ${token}`,
      //'Content-Type': 'application/json',
    },
  })

  return instance
}
