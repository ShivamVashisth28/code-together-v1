import { Router } from "express";
import { getMessage, putMessage } from "../utils/db";

const router = Router()

router.post('/all', async (req,res)=>{
    // get to and from id from params/body
    
    const fromId = req.body.from
    const toId = req.body.to
    
    try {
        const messages = await getMessage(fromId,toId);
        if(messages){
            return res.json({
                messages
            })
        }else{
            return  res.status(400).json({error:"no message found"})
        }
        
    } catch (error) {
        res.status(400).json({error:"error in finding messages"})
    }

 
})

router.post('/', async (req,res)=>{
    // get from id from the token
    const content = req.body.content
    const toId = Number(req.body.to)
    const fromId = Number(req.body.from)
    const date = new Date()
    // const time = `${date.getHours()} : ${date.getMinutes()} || ${date.getDate()}/${date.getMonth() +1}/${date.getFullYear()}`;
    const time = date.getHours()
    try {
        const mesg = await putMessage(fromId,toId,content,time); 
        if(mesg == null){
            return res.status(400).json({error:"error in putting message"})
        }
        res.json({
            mesg
        })   
    } catch (error) {
        return res.status(400).json({error:"can't send message"})
    }
    
})

export default router