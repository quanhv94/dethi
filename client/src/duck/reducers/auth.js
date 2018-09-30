import { createReducer } from 'redux-create-reducer'
import * as types from './../types'

const initialState = {
  user: null,
  fetchingCurrentUser: true
}

export default createReducer(initialState, {
  [types.LOGIN_FACEBOOK]: (state, action) => ({ ...state, fetchingCurrentUser: true }),
  [types.LOGIN_GOOGLE]: (state, action) => ({ ...state, fetchingCurrentUser: true }),
  [types.LOGIN_SUCCESS]: (state, action) => ({ ...state, user: action.payload, fetchingCurrentUser: false }),
  [types.FETCH_CURRENT_USER_SUCCESS]: (state, action) => ({ ...state, user: action.payload, fetchingCurrentUser: false }),
  [types.FETCH_CURRENT_USER_FAIL]: (state, action) => ({ ...state, fetchingCurrentUser: false }),
  [types.LOGOUT_SUCCESS]: (state, action) => ({ ...state, user: null }),
})
