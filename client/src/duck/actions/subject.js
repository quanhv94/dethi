import * as types from './../types'
export const fetchSubjectList = () => ({ type: types.FETCH_SUBJECT_LIST })
export const fetchSubjectListSuccess = (subjects) => ({ type: types.FETCH_SUBJECT_LIST_SUCCESS, payload: subjects })
