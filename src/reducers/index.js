import { combineReducers } from 'redux'
import scroll from './scroll'
import background from './background'
import place from './place'
import user from './user'
const todoApp = combineReducers({
  scroll,
  background,
  place,
  user
})

export default todoApp
