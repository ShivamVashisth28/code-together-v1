import jwt from 'jsonwebtoken'
const secretKey = 'secret';

const generateToken = (username:String )=>{
    const token = jwt.sign(username,secretKey)
    return token
}

const checkToken = (username:String, token:any)=>{
    try {
        var decoded = jwt.verify(token,secretKey);
    } catch (error) {
        console.log('error')
        return 'invalid token'
    }
    
    if(decoded){
       return decoded == username
    }
}

const decodeToken = (token:any)=>{
    const username = jwt.decode(token)
    return username
}


export {decodeToken, checkToken , generateToken}