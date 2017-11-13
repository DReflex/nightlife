import React from 'react';
import { connect } from 'react-redux';
import { addHeight, Query, addPlace, resetPlace, addPhoto, going, Background} from '../../actions/index'
import Login from './login/login';
import Logout from './login/logout'
import './home.css'
class Interface extends React.Component {
  constructor(){
    super();

    this.handleScroll = this.handleScroll.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress =this.handleKeyPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchPhoto = this.fetchPhoto.bind(this)
    this.handleBackground = this.handleBackground.bind(this)
  }
  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyPress);
    window.addEventListener('scroll', (e)=>this.handleScroll());
    var height = document.getElementById("icons").offsetTop
    this.props.dispatch(addHeight(height))
  }

componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
}

 //
  handleScroll = () => {
    if(window.pageYOffset > this.props.scroll.height + 100){
      document.getElementById("search").classList.add("visible")
    }
    else{
      document.getElementById("search").classList.remove("visible")
    }
  }

  handleChange = (e) =>{
    var query = e.target.value;
    this.props.dispatch(Query(query))
  }

  // https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAA4RHE6PipEM-Uc683Pol6moqHNrtfnWU8EqTicJLlnU5-jgeo0RBoYBkR0PAlrOriYtPl9_dvRSK-ARYuTDnuJdTH9mOwxRz2IMV7TUkm2A7A3lzcr9ve47so-I5OBWHCEhDqlQMn2Pog0kYxzSW5mkx-GhQtC9Sh6ezg188cyiYpGN8aEJZ-tg&key=AIzaSyAyBlS9Dg0LbOHV8ykJXiI6Qgv3ZDL1zsw
  //google detail
  // https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=YOUR_API_KEY
  //https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJa5tKoK7XZUcR290wa8oJUPM&key=AIzaSyAyBlS9Dg0LbOHV8ykJXiI6Qgv3ZDL1zsw
  // query caffe+bars+in+

  // https://maps.googleapis.com/maps/api/place/textsearch/json?query=coffie+bars+in+Zenica&key=AIzaSyAyBlS9Dg0LbOHV8ykJXiI6Qgv3ZDL1zsw
    //get google places from map api
  //https://maps.googleapis.com/maps/api/place/textsearch/json?query=[your search key word]&location=latitude,longitude&radius=value&key=[your API key]&next_page_token=next_page_token value

  handleKeyPress = (e) => {
      if(e.keyCode === 13){
        this.handleSubmit()
      }
  }
  fetchPhoto =(code, id) => {
    //logic here
    if(!code){
      this.props.dispatch(addPhoto({
        id,
        image: "http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg"
      }))
    }else{
      fetch(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${code}&key=AIzaSyAyBlS9Dg0LbOHV8ykJXiI6Qgv3ZDL1zsw`)
      .then(res => this.props.dispatch(addPhoto({
        id,
        image: res.url
      })
    )
    )
    }

  }
  fetchGoing =(id) =>{
    fetch(`/api/place/${id}`)
    .then((res)=>{
      if(res.status === 404){
        this.props.dispatch(going(id, 0))
      }
      else{
       fetch(`/api/place/${id}`).then(res => res.json())
       .then(data =>this.props.dispatch(going(id, data.value)) )

     }
    })
  }
  handleSubmit = () =>{
    // put data in redux and put image to redux hopefully
    console.log("sumbiting");
    this.props.dispatch(resetPlace());
    var url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=coffie+bars+in+${this.props.scroll.query}&key=AIzaSyAyBlS9Dg0LbOHV8ykJXiI6Qgv3ZDL1zsw`
    fetch(url, {
      mode:'cors',
      headers:{
        'Access-Control-Allow-Origin':'*'
      },
    })
    .then(res=> res.json()).then((data) => {
      data.results.map((result) => {
        var open;

        if(result.opening_hours === undefined){
           open = false
        }
        else{
           open = result.opening_hours.open_now
        }
        var data = {
          address: result.formatted_address,
          id: result.id,
          name: result.name,
          open: open,
          rating: result.rating
        }
        this.props.dispatch(addPlace(data))
        this.fetchGoing(result.id);
        if(!result.photos){
          this.fetchPhoto(false, result.id)

        }else{
          this.fetchPhoto(result.photos[0].photo_reference, result.id)
        }

        return data
    })
    this.handleBackground()
  }
  )
  }
  handleBackground= () =>{
    //dispatc props mimic content
    var height = document.getElementById('items').offsetHeight + 150;
    var win= window.innerHeight;
    console.log(height);
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
  render(){
    var user = this.props.user

    return (
      <div className="interface">
        <div className="overlay">
          <div className="box">
            <div className="heading">
              <h1>Any plans tonight? </h1>
            </div>
            <div id="icons" className="icons">
              <div className="icon">
                <img src="https://s-media-cache-ak0.pinimg.com/originals/a9/0f/d0/a90fd056334f59ce8e7cc5593e6d4d14.png" alt="img"/>
              </div>
              <div className="icon">
                <img src="https://cdn.glitch.com/a354874c-97f1-4ded-b2e3-660e263e138e%2Fcocktail-32051_960_720.png?1509900280070" alt="img"/>
              </div>
              <div className="icon">
                <img src="http://cdn.onlinewebfonts.com/svg/img_337205.png" alt="img"/>
              </div>
              <div className="icon">
                <img src="https://cdn.glitch.com/a354874c-97f1-4ded-b2e3-660e263e138e%2Fbreak-dance-2327123_640.png?1509900203831" alt="img"/>
              </div>
            </div>
           <div id="search" className="search">
              <input onChange={(e)=> this.handleChange(e)} value={this.props.scroll.query} placeholder="enter location" type="text" name="location"/>
              {user.loginStatus? <Logout/>: <Login />}
            </div>
          </div>


        </div>
      </div>
    )
  }
}
const store = (store) =>{
  return {
    scroll: store.scroll,
    place: store.place,
    user: store.user
  }
}

Interface = connect(store)(Interface)

export default Interface
