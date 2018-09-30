import React from 'react'

class Timer extends React.Component {
  constructor() {
    super()
    this.state = { time: 0 }
  }

  timeToString(time) {
    var minutes = Math.floor(time / 60)
    var seconds = (time % 60)
    seconds = seconds < 10 ? ('0' + seconds) : seconds
    return minutes + ':' + seconds
  }

  componentDidMount() {
    this.setState({ time: this.props.time })
    this.interval = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    window.clearInterval(this.interval)
  }

  tick = () => {
    if (!this.props.run) return
    if (this.state.time === 0) {
      window.clearInterval(this.interval)
      this.props.onFinish && this.props.onFinish.call()
    } else {
      this.setState({ time: this.state.time - 1 })
    }
  }

  render() {
    return <span>{this.timeToString(this.state.time)}</span>
  }
}

export default Timer
