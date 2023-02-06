import { Actions } from 'src/configs'
import axios from 'axios'

export async function getProvinceThunk(dispatch, getState) {
  await axios
    .get(`${process.env.REACT_APP_API}/api/provinces`)
    .then((res) => {
      dispatch({
        type: Actions.GET_PROVINCE_SUCCESS,
        payload: {
          data: res.data,
        },
      })
    })
    .catch((err) => {
      if (err.response) {
        dispatch({
          type: Actions.GET_PROVINCE_FAIL,
          payload: {
            message: err.response.data.message,
          },
        })
      }
    })
}
