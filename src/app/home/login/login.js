import React from 'react';
import SocialButton from './login-div';
import { connect } from 'react-redux';
import { userLogin } from '../../../actions/index'
class Login extends React.Component {


  handleSocialLogin = (user) => {
  console.log(user)
  fetch(`/api/user/${user._profile.id}`)
  .then((res) => {
    if(res.status === 404){
      fetch('/api/user', {
                method: 'POST',
                mode: 'CORS',
                body: JSON.stringify({
                  name: user._profile.firstName,
                  id: user._profile.id,
                  accessToken: user._token.accessToken,
                  expiresAt:user._token.expiresAt,
                  going_to:[]
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    }

  })
  .then(() => {
      fetch(`/api/user/${user._profile.id}`, {
                method: 'PUT',
                mode: 'CORS',
                body: JSON.stringify({
                  accessToken: user._token.accessToken,
                  expiresAt:user._token.expiresAt
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    })
    .then(()=>{
    let loginStatus;
    let time = user._token.expiresAt;
    let timeNow = Date.now();
    (time >= timeNow) ? loginStatus = true : loginStatus = false;
    let data ={
      name: user._profile.firstName,
      id: user._profile.id,
      loginStatus: loginStatus
    }
    this.props.dispatch(userLogin(data))
  })

}

handleSocialLoginFailure = (err) => {
  console.error(err)
}

  render(){
    return(
        <SocialButton
      provider='facebook'
      appId='354675081620273'
      onLoginSuccess={this.handleSocialLogin}
      onLoginFailure={this.handleSocialLoginFailure}
    >
    </SocialButton>
    )
  }
}
const store = (store) =>{
  return {
    user: store.user
  }
}

Login = connect(store)(Login)

export default Login
