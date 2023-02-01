<<<<<<< Updated upstream
import { userReducer } from 'src/redux/reducers'
import { legacy_createStore as createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { persistReducer, persistStore, createTransform } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const initialState = {
  sidebarShow: true,
}
=======
import { createStore } from 'redux'

const initialState = {
  sidebarShow: true,
}

>>>>>>> Stashed changes
const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

<<<<<<< Updated upstream
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const persistConfig = {
  key: 'root', // ten
  storage, // luu local
}
const userPersistConfig = {
  key: 'user',
  storage,
  blacklist: ['data'],
}

const allReducers = combineReducers({
  user: userReducer, // persistReducer(userPersistConfig, userReducer),
  changeState,
})

const persistedReducer = persistReducer(persistConfig, allReducers)
export const store = createStore(
  persistedReducer,
  composeEnhancer(applyMiddleware(thunkMiddleware)),
)

export const persistor = persistStore(store)
=======
const store = createStore(changeState)
export default store
>>>>>>> Stashed changes
