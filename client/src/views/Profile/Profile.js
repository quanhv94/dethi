import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import DatePicker from './../Share/DatePiker'
import genderOptions from './../../config/genderOptions'

const renderField = ({ input, label, placeholder, options, type, meta: { touched, error } }) => {
  return <FormGroup>
    <Label>{label}</Label>
    {
      type === 'date' ?
        <DatePicker  {...input} /> :
        type === 'select' ?
          <Input {...input} placeholder={placeholder} type='select'>
            {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
          </Input>
          :
          <Input {...input} placeholder={placeholder} type={type} autoComplete="off" />
    }
    {touched && error && <div className="error-block">{error}</div>}
  </FormGroup>
}


const validate = (values) => {
  const errors = {}
  if (!values.fullName) {
    errors.fullName = 'Vui lòng nhập họ tên'
  }
  if (values.phoneNumber && !/^0\d{9,10}$/.test(values.phoneNumber)) {
    errors.phoneNumber = 'SĐT không đúng định dạng'
  }
  return errors
}

class Profile extends React.Component {
  componentDidMount() {
    this.props.fetchCurrentUser()
  }


  submit = (event) => {
    event.preventDefault()
    this.props.updateProfile()
  }

  render() {
    const props = this.props
    const user = props.auth.user
    if (!user) return null
    console.log(props)
    return (
      <div className="container">
        <h4>Thông tin cá nhân</h4>
        <Form onSubmit={this.submit}>
          <Field label="Họ tên" name="fullName" component={renderField} />
          <Field label="Giới tính" name="gender" component={renderField} type="select" options={genderOptions} />
          <Field label="Ngày sinh" name="birthdate" component={renderField} type="date" />
          <Field label="Số điện thoại" name="phoneNumber" component={renderField} />
          <FormGroup>
            <Button color="success" disabled={props.invalid || props.submitting}>Cập nhật</Button>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default reduxForm({ form: 'profile', validate: validate })(Profile)
