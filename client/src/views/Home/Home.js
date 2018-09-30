import React from 'react'
import Login from './Login'
import SubjectList from './SubjectList'

class Home extends React.Component {
  componentDidMount() {
    this.props.fetchSubjectList()
  }
  render() {
    const props = this.props
    return (
      <div>
        <SubjectList subjects={props.subject.subjects} />
        <Login
          auth={props.auth}
          loginFacebook={props.loginFacebook}
          loginGoogle={props.loginGoogle}
        />
      </div>
    )
  }
}

export default Home
