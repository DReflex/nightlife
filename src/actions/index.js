
export const addHeight = (height) =>{
    return{
    type: 'ADD_HEIGHT',
    height
  }
  }

export const Query = (query) =>{
  return {
    type:'QUERY',
    query
  }
}
export const Background = (bg1, bg2, bg3, bg4) => {

  return{
    type:"BG",
    bg1,
    bg2,
    bg3,
    bg4
  }

}
export const addPlace = (action) => {
  return{
    type:'ADD_PLACE',
    name:action.name,
    id:action.id,
    address: action.address,
    rating:action.rating,
    open: action.open
  }
}
export const resetPlace = () =>{
  return {
    type:"RESET"
  }
}
export const addPhoto = (data) =>{
  return{
    type:"ADD_PHOTO",
    id: data.id,
    image: data.image
  }
}
export const going =(id, value) =>{
  return{
    type:"ADD_GOING",
    id,
    value
  }
}
export const userLogin = (data) =>{
  return{
    type: "LOGIN",
    name: data.name,
    id: data.id,
    loginStatus: data.loginStatus
  }
}
export const userLogout=() =>{
  return {
    type: "LOGOUT"
  }
}
