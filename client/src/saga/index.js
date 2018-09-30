
import { all, fork } from 'redux-saga/effects'
import auth from './auth'
import subject from './subject'
import exam from './exam'

export default function* rootSaga() {
  yield all([
    fork(auth),
    fork(subject),
    fork(exam),
  ])
}
