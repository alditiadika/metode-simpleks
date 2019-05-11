import { combineReducers } from 'redux'

import { testReducer } from './test/reducer'
import { mainReducer } from './main/reducer'
import { firstComponentReducer } from './standard-eq/reducer'
export default combineReducers({
  testReducer: testReducer,
  mainReducer: mainReducer,
  firstComponentReducer: firstComponentReducer
})
