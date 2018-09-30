
import { connect } from 'react-redux'
import Profile from './Profile'
import * as action from './../../duck/actions/auth'
import { bindActionCreators } from 'redux'

const mapStateToProps = state => ({ auth: state.auth, initialValues: state.auth.user })
const mapDispatchToProps = dispatch => bindActionCreators(action, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
