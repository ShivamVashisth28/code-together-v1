import {Router} from 'express'

const router = Router()

router.get('/:id',(req,res)=>{
    const roomId = req.params.id
    res.json({
        message:'get room by id'
    })
})

router.get('/all',(req,res)=>{
    res.json({
        message:'get all rooms list'
    })
})

router.post('/',(req,res)=>{
    res.json({
        message:'create room '
    })
})

export default router