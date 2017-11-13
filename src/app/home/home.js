import React from 'react'
import './home.css'
import Interface from './interface'
import Content from './content'

class Home extends React.Component {

  render(){
    return (
        <div className="body">
          <div className="background"><Interface /></div>
          <Content />
        </div>


    )
  }
}


export default Home
