import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './../../duck/actions/exam'
import Exam from './Exam'

const mapStateToProp = state => ({ exam: state.exam, auth: state.auth })
const mapDispatchToProp = dispatch => bindActionCreators(actions, dispatch)

export default connect(mapStateToProp, mapDispatchToProp)(Exam)
