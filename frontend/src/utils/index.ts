import axios from 'axios';

export const validUser = async (username:string, password:string) => {
  if (username === 'demo' && password === '123456') {
    return true;
  }

  try {
    const response = await axios.post('http://localhost:3000/v1/api/user/login', {
      username: username,
      password: password
    });

    // The data from the response
    console.log(response)
    const userData = response.data;
    if (userData) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error logging in:', error);
    return false;
  }
};


export const createUser = async (username:string, password:string, email:string)=>{
    try {
        const user = await axios.post('http://localhost:3000/v1/api/user/signup',{
            username,
            password,
            email
        })

        const data = user.data

        if(data){
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error logging in:', error);
        return false;
    }
}


export const getAllUsers = async ()=>{
    try {
      const users = await axios('http://localhost:3000/v1/api/user/all');
      const data = users.data
     
      return data 
    } catch (error) {
      return null
    }
}

export const createMessage = async (fromId:number, toId:number, content:string)=>{
    try {
      const message = await axios.post('http://localhost:3000/v1/api/message',{
          from:fromId,
          to:toId,
          content:content
      })
      const data = message.data

     
      console.log(data)
      
    } catch (error) {
      console.log(error)
    }
}

export const getMessage = async (fromId:number, toId:number)=>{
  try {
    const message = await axios.post('http://localhost:3000/v1/api/message/all/',{
        from:fromId,
        to:toId,
    })
    const data = message.data

    return(data)
    
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getUserId = async (username:string)=>{
    try {
      const id = await axios(`http://localhost:3000/v1/api/user/id/${username}`);
      const data = id.data
      return data;
    } catch (error) {
      return null;
    }
}

export const getUserNameFromId = async (id:number)=>{
  try {
    const username = await axios(`http://localhost:3000/v1/api/user/username/${id}`);
    const data = username.data
    return data;
  } catch (error) {
    return null;
  }
}