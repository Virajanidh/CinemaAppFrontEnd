import { APIHandler } from "../Handlers/APIHandler";

export const addSeatService = async (data) => {
    const queryString = new URLSearchParams(data).toString();
    console.log(data)
    try {
      const response = await fetch('http://localhost:8080/seat', {
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



export const getSeatDetails=async(cinemaId)=>{
  try {
    const response = await fetch(`http://localhost:8080/seat/${cinemaId}`, {
        
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
export const getBookingDetails=async(cinemaId)=>{
  try {
    const response = await fetch(`http://localhost:8080/seat/booking/${cinemaId}`, {
        
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

export const editSeatService = async (data,id) => {
  const seatId=parseInt(id)
 
  try {
    const response = await fetch(`http://localhost:8080/seat/${seatId}`, {
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

export const editSeatPriceService = async (data,id) => {
  const movieseatId=parseInt(id)
  const queryString = new URLSearchParams(data).toString();
  try {
    const response = await fetch(`http://localhost:8080/seat/price/${movieseatId}`, {
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