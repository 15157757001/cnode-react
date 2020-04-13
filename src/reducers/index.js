import { combineReducers,createStore,applyMiddleware } from 'redux';
import { userReducer } from './user-reducer';
import thunk from 'redux-thunk';

const allReducers = {
  user: userReducer
}



let store = createStore(
  combineReducers(allReducers),
  applyMiddleware(thunk)
);

export default store;