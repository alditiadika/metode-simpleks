import { combineReducers } from 'redux'

import { mainReducer } from './main/reducer'
import { firstComponentReducer } from './standard-eq/reducer'
export default combineReducers({
  mainReducer: mainReducer,
  firstComponentReducer: firstComponentReducer
})
