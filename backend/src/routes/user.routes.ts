import { Router } from "express";
import { generateToken } from "../middlewares/auth";
import { createUser, getAllUsers, getUser, getUserById } from "../utils/db";


const router = Router()

router.post('/login',async (req,res)=>{
    // get the user details
    const details = req.body
    if(!details){
        return res.status(400).json({error:"Cant find User"})
    }
    // check whether details are valid or not
    try {
        const user = await getUser(details.username);
        if(!user){
           return res.status(400).json({error:"Cant find User"})
        }
        if(!(user?.password == details.password)){
           return  res.status(400).json({error:"invalid password"})
        }
    } catch (error) {
       return res.status(400).json({error:"Cant get the user"})
    }
    

    // generate token
    const token = generateToken(details.username)
    // return the token


    res.json({message:"loggedin successfully", token})
})

router.post('/signup', async (req,res)=>{
     // get the user details
    const details = req.body

    if(!details){
        return res.status(400).json({error:"Invalid details"})
    }
    // find user is alreay there or not

    try {
        const userAlready = await getUser(details.username)
        if(!userAlready){

        }else{
            return res.status(400).json({error:"user already exists with same username"})
        }
    } catch (error) {
        return res.status(400).json({error:"Error in connection with database"})
    }

    try {
        const user = createUser(details.username, details.email, details.password);
        if(user==null) {
          return  res.status(400).json({error:"cant create a new user"})
        }
        
    } catch (error) {
        return res.status(400).json({error:"cant create a new user"})
        
    }

    
    // generate token

    const token = generateToken(details.username)
    // return the token

    if(!token){
        return res.status(400).json({error:"Creaeted user but no token error"})
    }

    res.json({
        message:"signup success",
        token,
        
    })
})

router.get('/logout',(req,res)=>{
    // clear the token
    res.json({message:'bye'})
})


router.get('/all',async (req,res)=>{
    try {
        const users = await getAllUsers();
        if(!users){
            return res.status(400).json({error:"cant find all users"})
        }
        res.json({
            users
        })
    } catch (error) {
        return res.status(400).json({error:"cant find all users error"})
        
    }
})

router.get('/id/:username',async(req,res)=>{
    const username = req.params.username
    try {
        const user = await getUser(username);
        res.json(user?.id);
    } catch (error) {
        return res.status(400).json({error:"error in getting userId"})
    }


})

router.get('/username/:id',async(req,res)=>{
    const id = Number(req.params.id)
    try {
        const user = await getUserById(id);
        res.json(user?.username);
    } catch (error) {
        return res.status(400).json({error:"error in getting userId"})
    }


})


export default router