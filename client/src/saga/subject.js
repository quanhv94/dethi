import { put, takeLatest, call, all } from 'redux-saga/effects'
import * as types from './../duck/types'
import * as api from './../api'
import * as actions from './../duck/actions/subject'

function* fetchSubjectList() {
  try {
    const response = yield call(api.fetchSubjectList)
    const data = response.data
    yield put(actions.fetchSubjectListSuccess(data.subjects))
  } catch (e) {
  }
}

export default function* watchAll() {
  yield all([
    takeLatest(types.FETCH_SUBJECT_LIST, fetchSubjectList)
  ])
}
