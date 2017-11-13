
const stateInit = {
  height: Number,
  query: ""
}
const scroll = (state = stateInit, action) => {
  switch (action.type) {
    case 'ADD_HEIGHT':
      return{
          ...state,
          height: action.height,
          fixed: false,
        }

      case 'QUERY':
      return{
        ...state,
        query: action.query
      }

      default:
      return state
  }

}

export default scroll
