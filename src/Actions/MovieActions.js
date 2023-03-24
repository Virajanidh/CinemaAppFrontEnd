import {movieTypes} from '../Reducers/types';
import { addMovieService,editMovieService,deleteMovieService,getAllMoviesService } from '../Services/MovieService';

export const MovieActions = {

    addMovie,
    getMovies,
    editMovie,
   // deleteMovie
};

function addMovie(paramdata){
    return async dispatch => {
        try {
            const data = await addMovieService(paramdata);
            console.log(data)
            dispatch(success(data));
        } catch (error) {
            console.log(error)
            dispatch(fail())
        }
    };

    function success(data) {
        return {type: movieTypes.ADD_MOVIES_SUCCESS,data}
    }
    function fail(){
        return {type: movieTypes.ADD_MOVIES_FAIL}
    }
}

function getMovies(cinemaId){
    return async dispatch => {
        try {
            const data = await getAllMoviesService(cinemaId);
            console.log(data)
            dispatch(success(data));
        } catch (error) {
            console.log(error)
            dispatch(fail())
        }
    };

    function success(data) {
        return {type: movieTypes.GET_MOVIES_SUCCESS,data}
    }
    function fail(){
        return {type: movieTypes.GET_MOVIES_FAIL}
    }
}

function editMovie(updateddata,movieId){
    return async dispatch => {
        try {
            const data = await editMovieService(updateddata,movieId);
            console.log(data)
            dispatch(success(data));
        } catch (error) {
            console.log(error)
            dispatch(fail())
        }
    };

    function success(data) {
        return {type: movieTypes.EDIT_MOVIES_SUCCESS,data}
    }
    function fail(){
        return {type: movieTypes.EDIT_MOVIES_FAIL}
    }
}




