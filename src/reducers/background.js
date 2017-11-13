
const stateInit = {
  background1: 0,
  background2: 0,
  background3: 0,
  background4:0

}
const background = (state = stateInit, action) => {
  switch (action.type) {
    case 'BG':
      return{
          ...state,
          background1: action.bg1,
          background2: action.bg2,
          background3: action.bg3,
          background4: action.bg4

        }

      default:
      return state
  }

}

export default background
