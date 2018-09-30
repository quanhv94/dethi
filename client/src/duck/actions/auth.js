import * as types from './../types'

export const loginFacebook = (token) => ({ type: types.LOGIN_FACEBOOK, payload: token })
export const loginGoogle = (token) => ({ type: types.LOGIN_GOOGLE, payload: token })
export const loginSuccess = (data) => ({ type: types.LOGIN_SUCCESS, payload: data })
export const logout = () => ({ type: types.LOGOUT })
export const logoutSuccess = () => ({ type: types.LOGOUT_SUCCESS })
export const fetchCurrentUser = () => ({ type: types.FETCH_CURRENT_USER })
export const fetchCurrentUserSuccess = (user) => ({ type: types.FETCH_CURRENT_USER_SUCCESS, payload: user })
export const fetchCurrentUserFail = () => ({ type: types.FETCH_CURRENT_USER_FAIL })
export const updateProfile = () => ({ type: types.UPDATE_PROFILE })
export const updateProfileSuccess = (user) => ({ type: types.UPDATE_PROFILE_SUCCESS, payload: user })
