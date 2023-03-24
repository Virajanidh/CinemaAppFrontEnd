import { APIHandler } from "../Handlers/APIHandler";


export const signIn = async (username,password) => {

  
    try {
      const response = await fetch('http://localhost:8080/login', {
          
        headers: {
         // 'Authorization': 'Basic '+btoa('password1234h@gmail.com:password'),
          'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
        },
      });
      
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.log(error)
      throw new Error('API call failed.');
    }
  };

  export const signUp = async (data) => {

    // const params = {
    //     username: email,
    //   };
      
      const queryString = new URLSearchParams(data).toString();
    try {
      const response = await fetch('http://localhost:8080/user/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const resdata = await response.json();
      return resdata;
    } catch (error) {
      throw new Error(error);
    }
  };

  export const profileUpdateService = async (data,id) => {

   
      // const username=data.email
      // const password="password"
      const cinemaId=parseInt(id)
      const queryString = new URLSearchParams(data).toString();
    try {
      const response = await fetch(`http://localhost:8080/login/profile/${cinemaId}`, {
        method: 'PUT',
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
  
