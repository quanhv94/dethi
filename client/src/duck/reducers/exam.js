import { createReducer } from 'redux-create-reducer'
import * as types from './../types'

const initialState = {
  examList: [],
  exam: null,
  fetching: false,
  errMessage: null,
}

export default createReducer(initialState, {
  [types.GENERATE_EXAM]: () => ({ ...initialState, fetching: true }),
  [types.GENERATE_EXAM_SUCCESS]: (state, action) => ({ ...state, exam: action.payload, fetching: false }),
  [types.GENERATE_EXAM_FAIL]: (state, action) => ({ ...state, fetching: false, errMessage: action.payload }),
  [types.FETCH_EXAM]: () => ({ ...initialState, fetching: true }),
  [types.FETCH_EXAM_SUCCESS]: (state, action) => ({ ...state, exam: action.payload, fetching: false }),
  [types.FETCH_EXAM_FAIL]: (state, action) => ({ ...state, fetching: false, errMessage: action.payload }),
  [types.FETCH_EXAM_LIST]: () => ({ ...initialState, fetching: true }),
  [types.FETCH_EXAM_LIST_SUCCESS]: (state, action) => ({ ...state, fetching: false, examList: action.payload }),

})
