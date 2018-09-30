import React from 'react'
import FacebookLogin from 'react-facebook-login'
import { GoogleLogin } from 'react-google-login'

const Login = (props) => {
  if (props.auth.user) return null
  return <div className="d-flex flex-wrap justify-content-center">
    <h5 style={{ flexBasis: '100%', textAlign: 'center' }}>Đăng nhập bằng</h5>
    <FacebookLogin
      appId="245691449626866"
      fields="name,email,picture"
      textButton="Facebook"
      callback={(res) => props.loginFacebook(res.accessToken)}
    />
    &nbsp;&nbsp;&nbsp;
    <GoogleLogin
      clientId="398331420373-ornoo96nrsd68a9tpritem5spl58p625.apps.googleusercontent.com"
      buttonText="Google"
      onSuccess={(res) => props.loginGoogle(res.accessToken)}
      className="google-login-button"
    />
  </div>
}

export default Login
