import { Actions } from '../../config/Actions'

const initialState = {
  message: '',
  data: JSON.parse(localStorage.getItem(`${process.env.REACT_APP_PREFIX_LOCAL}_user`)) || {},
}
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.LOGIN_SUCCESS:
      return { ...state, data: action.payload.user, message: action.payload.message }
    case Actions.LOGIN_FAIL:
      return { ...state, message: action.payload.message }
    case Actions.CHANGE_LANGUAGE_SUCCESS:
      return {
        ...state,
        data: { ...state.data, language: action.payload.language },
        message: action.payload.message,
      }
    case Actions.CHANGE_LANGUAGE_FAIL:
      return { ...state, message: action.payload.message }
    case Actions.LOGOUT_SUCCESS:
      return {}
    case Actions.LOGOUT_FAIL:
      return {}
    default:
      return state
  }
}

export default userReducer
