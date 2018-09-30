
import { connect } from 'react-redux'
import Header from './Header'
import * as action from './../../duck/actions/auth'
import { bindActionCreators } from 'redux'

const mapStateToProps = state => ({ auth: state.auth })
const mapDispatchToProps = dispatch => bindActionCreators(action, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Header)
