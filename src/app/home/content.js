import React from 'react';
import { connect } from 'react-redux';
import { Background } from '../../actions/index'
import Footer from './footer'
import { going } from '../../actions/index'

import './home.css'

class Content extends React.Component {
  constructor(){
    super();
    this.rating = this.rating.bind(this)
    this.going = this.going.bind(this)

  }
  componentDidMount(){
    var height = document.getElementById('items').offsetHeight + 150;
    var win= window.innerHeight;
    console.log("win", win,'\n',"height", height);
    console.log("screen times", (height/win));
    if(height <= (0.5 * win)){
      this.props.dispatch(Background(height, 0, 0, win))
    }
    else if(height > (0.5 * win) && height <= (1.5 * win)){
      let bg1 = height * 0.7;
      let bg2 = height * 0.3;
      this.props.dispatch(Background(bg1, bg2, 0, win))
    }
    else if(height > 1.5*win && height <=2*win){
      let bg1 = Math.round(height * 0.5);
      let bg2 = Math.round(height * 0.5);
      this.props.dispatch(Background(bg1, bg2, 0, win))
    }
    else if (height > 2 * win){
      height += 100;
      let bg1 = Math.round(height * 0.3);
      let bg2 = Math.round(height * 0.3);
      let bg3 = Math.round(height * 0.4)
      this.props.dispatch(Background(bg1, bg2, bg3, win))
    }

  }
  rating =(rating) =>{
    var rate = Math.round(rating)
    switch (rate){
      case 1 :
      return(<div className="rating">
        <span className="fa fa-star checked"></span>
        <span className="fa fa-star "></span>
        <span className="fa fa-star "></span>
        <span className="fa fa-star "></span>
        <span className="fa fa-star"></span>
        <p>{rating}</p>
      </div>)
      case 2 :
      return(<div className="rating">
        <span className="fa fa-star checked"></span>
        <span className="fa fa-star checked"></span>
        <span className="fa fa-star "></span>
        <span className="fa fa-star "></span>
        <span className="fa fa-star"></span>
        <p>{rating}</p>
      </div>)
      case 3 :
      return(<div className="rating">
        <span className="fa fa-star checked"></span>
        <span className="fa fa-star checked"></span>
        <span className="fa fa-star checked"></span>
        <span className="fa fa-star "></span>
        <span className="fa fa-star"></span>
        <p>{rating}</p>
      </div>)
      case 4 :
      return(<div className="rating">
        <span className="fa fa-star checked"></span>
        <span className="fa fa-star checked"></span>
        <span className="fa fa-star checked"></span>
        <span className="fa fa-star checked"></span>
        <span className="fa fa-star"></span>
        <p>{rating}</p>
      </div>)
      case 5 :
      return(<div className="rating">
        <span className="fa fa-star checked"></span>
        <span className="fa fa-star checked"></span>
        <span className="fa fa-star checked"></span>
        <span className="fa fa-star checked"></span>
        <span className="fa fa-star checked"></span>
        <p>{rating}</p>
      </div>
    )
      default:
      return(
      <div className="rating">
        <span className="fa fa-star "></span>
        <span className="fa fa-star "></span>
        <span className="fa fa-star "></span>
        <span className="fa fa-star "></span>
        <span className="fa fa-star"></span>
        <p>0</p>
      </div>
    )
    }

  }

  going = (place) =>{
  var user = this.props.user
  if(!user || user.loginStatus === false){
    alert("login");
  }else{
    fetch(`/api/place/${place.id}`).then((res)=>{
      if(res.status === 404){
        fetch(`/api/place`,{
          method: 'POST',
          mode: 'CORS',
          body: JSON.stringify({
            name: place.name,
            id: place.id,
            value: 1,
            who:[user.id]
          }),
          headers: {
              'Content-Type': 'application/json'
          }
        }).then(()=>{
          //update user and user redux
          this.props.dispatch(going(place.id, 1))
          fetch(`/api/user/${user.id}`).then(res => res.json()).then((data) =>{
            var going_place = data.going_to
            going_place.push(place.id)
            fetch(`/api/user/${user.id}`,{
              method: 'PUT',
              mode: 'CORS',
              body: JSON.stringify({
                going_to:going_place
              }),
              headers: {
                  'Content-Type': 'application/json'
              }
            })
          })

        })
      }else{
        fetch(`/api/place/${place.id}`).then(res => res.json())
        .then(data => {
          var who = data.who
          var value = data.value
          var newWho = who.filter((string) => {
            return string !== user.id
          })

          if(who.length !== newWho.length){
            value --;
            //put it to server
            console.log("!=length");
            fetch(`/api/place/${place.id}`,{
              method: 'PUT',
              mode: 'CORS',
              body: JSON.stringify({
                value: value,
                who:newWho
              }),
              headers: {
                  'Content-Type': 'application/json'
              }
            })

            this.props.dispatch(going(place.id, value))
          }else{
            value ++;
            who.push(user.id)
            console.log(who);
            //put it to server
            fetch(`/api/place/${place.id}`,{
              method: 'PUT',
              mode: 'CORS',
              body: JSON.stringify({
                value: value,
                who:who
              }),
              headers: {
                  'Content-Type': 'application/json'
              }
            })
            this.props.dispatch(going(place.id, value))

          }

          })

      }
    })
  }
}
  render(){
    var bg = this.props.background
    var place = this.props.place
    return (
      <div style={{height:bg.background1}} className="background background1">
        <div className="overlay">
          <div className="content">
            <div id="items" className="itemContainer">

            {place.map((res, i) => {
                return(
                  <div key={i} className="itemBox">
                    <div className="image">
                      <img src={res.image} alt=" "/>
                    </div>
                    <div className="name">
                      <h2>{res.name}</h2>
                      {this.rating(res.rating)}

                      <p className="address">{res.address}</p>
                    </div>
                    <div className="info">
                      <div onClick={()=>this.going(res)} className="going">
                        GOING {res.going}
                      </div>
                      <div className="open">
                        {res.open ?  <img src="https://image.flaticon.com/icons/svg/32/32567.svg" alt="" />
                        :  <img src="https://maxcdn.icons8.com/Android_L/PNG/512/Household/door-512.png" alt="" /> }
                      </div>
                    </div>
                  </div>
                )
              })}

            </div>
          </div>
        </div>
        <div style={{height: bg.background2 + "px"}}  className="background background2"> <div className="overlay"></div></div>
        <div style={{height: bg.background3 + "px"}} className="background background3"> <div className="overlay"></div></div>
        <Footer />
      </div>



    )
  }
}

const store = (store) =>{
  return {
    background: store.background,
    place: store.place,
    user: store.user
  }
}

Content = connect(store)(Content)
export default Content

// Never cared for what they say
// Never cared for games they play
// Never cared for what they do
// Never cared for what they know
