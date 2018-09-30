import Home from './Home'
import { bindActionCreators } from 'redux'
import { loginFacebook, loginGoogle } from './../../duck/actions/auth'
import { fetchSubjectList } from './../../duck/actions/subject'
import { connect } from 'react-redux';

const mapStatetoProps = (state) => ({
  auth: state.auth,
  subject: state.subject
})

const mapDispatchToProps = (dispatch) => bindActionCreators({ loginFacebook, loginGoogle, fetchSubjectList }, dispatch)

export default connect(mapStatetoProps, mapDispatchToProps)(Home)
