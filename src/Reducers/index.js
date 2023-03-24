import { combineReducers } from 'redux';
import MovieReducer from './MovieReducer';
import userReducer from './UserReducer';


const rootReducer = combineReducers({
  user: userReducer,
  movie:MovieReducer
  
  
});
export default rootReducer;