import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './../../duck/actions/exam'
import ExamHistory from './ExamHistory'

const mapStateToProp = state => ({ exam: state.exam })
const mapDispatchToProp = dispatch => bindActionCreators(actions, dispatch)

export default connect(mapStateToProp, mapDispatchToProp)(ExamHistory)
