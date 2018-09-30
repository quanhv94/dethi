import { put, takeLatest, call, all } from 'redux-saga/effects'
import * as types from './../duck/types'
import * as api from './../api'
import * as actions from './../duck/actions/auth'
import { push } from './../history'

function* loginFacebook(action) {
  const response = yield call(api.loginFacebook, action.payload)
  const data = response.data
  window.localStorage.setItem('token', data.token)
  yield put(actions.loginSuccess(data.user))
}

function* loginGoogle(action) {
  const response = yield call(api.loginGoogle, action.payload)
  const data = response.data
  window.localStorage.setItem('token', data.token)
  yield put(actions.loginSuccess(data.user))
}

function* logout(action) {
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('user')
  yield push('/')
  yield put(actions.logoutSuccess())
}

function* fetchCurrentUser() {
  try {
    if (!window.localStorage.getItem('token')) {
      yield put(actions.fetchCurrentUserFail())
    } else {
      const response = yield call(api.fetchCurrentUser)
      const data = response.data
      yield put(actions.fetchCurrentUserSuccess(data.user))
    }
  } catch (e) {
    yield put(actions.fetchCurrentUserFail())
  }
}

export default function* watchAll() {
  yield all([
    takeLatest(types.LOGIN_FACEBOOK, loginFacebook),
    takeLatest(types.LOGIN_GOOGLE, loginGoogle),
    takeLatest(types.FETCH_CURRENT_USER, fetchCurrentUser),
    takeLatest(types.LOGOUT, logout),
  ])
}
