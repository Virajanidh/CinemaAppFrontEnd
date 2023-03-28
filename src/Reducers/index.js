import { combineReducers } from 'redux';
import MovieReducer from './MovieReducer';
import userReducer from './UserReducer';
import SeatReducer from './SeatReducer';


const rootReducer = combineReducers({
  user: userReducer,
  movie:MovieReducer,
  seat:SeatReducer
  
  
});
export default rootReducer;