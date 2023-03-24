import {movieTypes} from './types'; 
const initialState = {
  allMovies:[],
  
  movieGetError:''
};

const MovieReducer = (state = initialState, action)=> {
  switch (action.type) {
    case movieTypes.GET_MOVIES_SUCCESS:
      return {
        ...state,
        allMovies:action.data,
        movieGetError:""
        
      };
      case movieTypes.GET_MOVIES_FAIL:
      return {
        ...state,
        allMovies:[],
        movieGetError:"Error in loading ",

        
      };
      case movieTypes.ADD_MOVIES_SUCCESS:
        return{
            ...state,
            allMovies: [...state.allMovies, action.data]
        }
    
    default:
      return state;
  }
}
 export default MovieReducer;