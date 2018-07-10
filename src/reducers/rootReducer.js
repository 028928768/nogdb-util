import { combineReducers } from 'redux'
import graphCanvasReducer from './graphCanvasReducer'
import rescaleReducer from './RescaleReducer';



export default combineReducers({
  graph: graphCanvasReducer,
  scale: rescaleReducer
  
  
})