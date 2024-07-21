import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getUser = async (username:string)=>{
    try {
        const user = await prisma.user.findFirst({
            where:{
                username:username
            }
        })
        return user
    } catch (error) {
        return null
    }
}


export const getUserById = async (id:number)=>{
    try {
        const user = await prisma.user.findFirst({
            where:{
                id:id
            }
        })
        return user
    } catch (error) {
        return null
    }
}

export const getAllUsers = async ()=>{
    try{
        const users = await prisma.user.findMany({})
        return users
    }catch(error){
        return null
    }
}

export const createUser = async (username:string , email:string, password:string)=>{
   try {
     const res = await prisma.user.create({
         data:{
             username:username,
             email:email,
             password:password
         }
     })
     console.log(res);
     return res
   } catch (error) {
        return null
   }
   
}

export const getMessage = async(fromId:number, toId:number)=>{
    const res = await prisma.message.findMany({
        where:{
            fromId:fromId,
            toId:toId
        }
    })

    console.log(res);
    return res
}

export const putMessage = async(fromId:number , toId:number, content:string, time:any)=>{
    try {
        const res = await prisma.message.create({
            data:{
                fromId:fromId,
                toId:toId,
                content:content,
                time: time
            }
        })
        console.log(res)
        return res;
    } catch (error) {
        return null
    }
}

