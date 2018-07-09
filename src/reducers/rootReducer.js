import { combineReducers } from 'redux'
import graphCanvasReducer from './graphCanvasReducer'


export default combineReducers({
  graph: graphCanvasReducer,
  
})