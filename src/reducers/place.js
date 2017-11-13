
const stateInit = []
const place = (state = stateInit, action) => {
  switch (action.type) {
    case 'ADD_PLACE':
      return [
        ...state,
        {
        name:action.name,
        id:action.id,
        address: action.address,
        rating:action.rating,
        open: action.open,
        image:"",
        going:0
        }
      ]
      case 'RESET':
      return state = [];

      case 'ADD_PHOTO':
      return state.map(data => (data.id === action.id)
      ?{
        ...data,
        image: action.image
      }
      :data
    )
    case "ADD_GOING":
    return state.map(data=> (data.id === action.id)?{
      ...data,
      going:action.value
    }
      :data
    )

      default:
      return state
  }

}

export default place
