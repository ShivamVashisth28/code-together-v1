import Chatlist from "../components/shared/Chatlist";
import { useParams } from "react-router-dom";
import Chatwindow from "../components/shared/Chatwindow";
import { useEffect, useState } from "react";
import { getUserNameFromId } from "../utils";

function Chat() {

    let userId = useParams();

    
    const [username,setUsername] = useState('')

    const fxnToGetUsername = async ()=>{
        const id = Number(userId.id);
        const data= await getUserNameFromId(id)
        setUsername(data);
    }

    useEffect( ()=>{
        fxnToGetUsername()
        
    },[userId])
    
    return (
        <div className="grid grid-cols-12 h-screen">
        <div className="col-span-3 bg-gray-300 ">
            <Chatlist />
        </div>
        <div className="col-span-9 bg-slate-500">
            {userId.id !== '0' ? 
                <Chatwindow username={username || "Loading"} toId ={userId.id} />
            :  
                <div className="flex h-full w-full justify-center items-center flex-col text-4xl">
                    <div>Select A Contact To Start Messaging {userId.id} </div>
                </div>

            }
        </div>
        
        </div>
    )
}

export default Chat