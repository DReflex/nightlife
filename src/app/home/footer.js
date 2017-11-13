import React from 'react';
import './home.css';
import { connect } from 'react-redux';

class Footer extends React.Component{
  render(){
    var bg =this.props.background
    return(
      <div style={{height: bg.background4 + "px"}} className="background background4"><div className="overlay">
        <div className="footer">
          <h1>Powered by</h1>
          <img src="https://www.google.com/images/srpr/logo11w.png" alt="Google"/>
          <h2>Made by </h2>
          <div className="contact">
            <p>@GitHub</p><span>|</span><p>Portfolio</p>
          </div>

        </div>
      </div></div>
    )
  }
}
const store = (store) =>{
  return {
    background: store.background,
  }
}

Footer = connect(store)(Footer)
export default Footer
