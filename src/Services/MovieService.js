import { APIHandler } from "../Handlers/APIHandler";

export const addMovieService = async (data) => {
    const queryString = new URLSearchParams(data).toString();
    console.log(data)
    try {
      const response = await fetch('http://localhost:8080/movie', {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json',
        //   'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
        // },
        headers:APIHandler.getHeaderWithPasswordAuth(),
        body: JSON.stringify(data)
      });
      const resdata = await response.json();
      return resdata;
    } catch (error) {
      throw new Error(error);
    }
}
export const editMovieService = async (data,id) => {
    const movieId=parseInt(id)
    const queryString = new URLSearchParams(data).toString();
    try {
      const response = await fetch(`http://localhost:8080/movie/${movieId}`, {
        method: 'PUT',
        headers: APIHandler.getHeaderWithPasswordAuth(),
        body: JSON.stringify(data)
      });
      const resdata = await response.json();
      return resdata;
    } catch (error) {
      throw new Error(error);
    }
}
export const deleteMovieService = async () => {

}
export const getMoviesService = async (id) => {
    try {
        const response = await fetch('http://localhost:8080/login', {
            
          headers: APIHandler.getHeaderWithPasswordAuth(),
        });
        
        const data = await response.json();
        console.log(data)
        return data;
      } catch (error) {
        console.log(error)
        throw new Error('API call failed.');
      }

}
export const getOneMovieService = async () => {

}
export const getAllMoviesService=async(cinemaId)=>{
  try {
    const response = await fetch(`http://localhost:8080/movie/cinema/${cinemaId}`, {
        
      headers: APIHandler.getHeaderWithPasswordAuth(),
    });
    
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.log(error)
    throw new Error('API call failed.');
  }
}