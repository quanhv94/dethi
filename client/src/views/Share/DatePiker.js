import React from 'react'
import { Input } from 'reactstrap'
import Calendar from 'react-calendar'
import moment from 'moment'

export default class DatePicer extends React.Component {
  constructor() {
    super()
    this.state = {
      date: null,
      showCalendar: false
    }
  }

  componentDidMount() {
    const value = this.props.value
    this.setState({
      date: value ? moment(value).toDate() : null
    })
  }

  changeDate = (date) => {
    this.setState({ date: date, showCalendar: false })
    this.props.onChange && this.props.onChange(moment(date).utcOffset('+0'))
  }

  render() {
    const date = this.state.date
    const props = this.props
    return (
      <div className="date-picker">
        <Input readOnly
          onFocus={() => this.setState({ showCalendar: true })}
          value={date ? moment(date).format('DD/MM/YYYY') : ''}
        />
        {this.state.showCalendar && (
          <div className="date-picker__backdrop"
            onClick={() => this.setState({ showCalendar: false })}
          />
        )}
        {this.state.showCalendar && (
          <div className="date-picker__calendar">
            <Calendar {...props} value={this.state.date} onChange={this.changeDate} />
          </div>
        )}
      </div>
    )
  }
}
