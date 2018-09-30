import { createReducer } from 'redux-create-reducer'
import * as types from './../types'

const initialState = {
  subjects: []
}

export default createReducer(initialState, {
  [types.FETCH_SUBJECT_LIST_SUCCESS]: (state, action) => ({ ...state, subjects: action.payload }),
})
