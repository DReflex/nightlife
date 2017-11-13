const stateInit={
  name:"",
  id:Number,
  loginStatus: false,
}
const user =(state = stateInit, action) => {
  switch(action.type){
    case 'LOGIN':
    return{
      ...state,
      name:action.name,
      id:action.id,
      loginStatus: action.loginStatus

    }
    case 'LOGOUT':
    return{
      ...state,
       name:"",
       id:0,
       loginStatus:false
     }


    default:
    return state
  }
}


export default user
