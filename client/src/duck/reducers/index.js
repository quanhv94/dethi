import { combineReducers } from "redux"
import auth from './auth'
import subject from './subject'
import exam from './exam'

export default combineReducers({
  auth,
  subject,
  exam,
})
