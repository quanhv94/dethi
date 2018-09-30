import { put, takeLatest, call, all } from 'redux-saga/effects'
import * as types from './../duck/types'
import * as api from './../api'
import * as actions from './../duck/actions/exam'

function* generateExam(action) {
  try {
    const response = yield call(api.generateExam, action.payload)
    const data = response.data
    yield put(actions.generateExamSuccess(data))
  } catch (e) {
    yield put(actions.generateExamFail(e.response.data.errMessage))
  }
}

function* fetchExam(action) {
  try {
    const response = yield call(api.fetchExam, action.payload)
    const data = response.data
    yield put(actions.fetchExamSuccess(data))
  } catch (e) {
    yield put(actions.fetchExamFail(e.response.data.errMessage))
  }
}

function* fetchExamList(action) {
  try {
    const response = yield call(api.fetchExamList, action.payload)
    const data = response.data
    yield put(actions.fetchExamListSuccess(data))
  } catch (e) {
  }
}

function* saveExam(action) {
  try {
    yield call(api.saveExam, action.payload)
  } catch (e) {
    console.log(e)
  }
}

export default function* watchAll() {
  yield all([
    takeLatest(types.GENERATE_EXAM, generateExam),
    takeLatest(types.FETCH_EXAM, fetchExam),
    takeLatest(types.SAVE_EXAM, saveExam),
    takeLatest(types.FETCH_EXAM_LIST, fetchExamList)
  ])
}
