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
  
  /*
  
  const params = {
  key1: 'value1',
  key2: 'value2'
};

fetch('https://example.com/api', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(params)
});

  */