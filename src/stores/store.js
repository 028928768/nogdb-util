import { createStore, applyMiddleware } from 'redux'
// import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers/rootReducer'
// import { userSaga } from '../sagas/saga'

// const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer)
//   , applyMiddleware(sagaMiddleware)
// sagaMiddleware.run()

export default store
