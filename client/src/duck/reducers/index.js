import { combineReducers } from "redux"
import { reducer as formReducer } from 'redux-form'
import auth from './auth'
import subject from './subject'
import exam from './exam'

export default combineReducers({
  auth,
  subject,
  exam,
  form: formReducer
})
