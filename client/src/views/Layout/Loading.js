import React from 'react'

class Loading extends React.Component {
  componentDidMount() {
    this.props.fetchCurrentUser()
  }
  render() {
    const props = this.props
    if (!props.auth.fetchingCurrentUser) return null
    return <div className='loading-screen'>
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  }
}
export default Loading
