import React from 'react'
import SocialLogin from 'react-social-login'
import '../home.css'
const Button = ({ triggerLogin, ...props }) => (
  <div onClick={triggerLogin} {...props} className="login"><img src="https://cdn.worldvectorlogo.com/logos/facebook-3.svg" alt="#" /><p className="xs-hide">connect</p></div>
)

export default SocialLogin(Button)
