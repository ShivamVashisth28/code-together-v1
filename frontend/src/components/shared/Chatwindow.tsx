// import {  useEffect, useRef, useState } from "react";
// import { createMessage, getMessage, getUserId } from "../../utils";
// import { usernameState } from "../../store/atoms/user";
// import { useRecoilValue } from "recoil";
// import { socket } from "../../socket";

// function Chatwindow(props : any) {
    
//     const [data,setData] = useState([])
//     const inputMesgRef = useRef(null);
//     const [inputMsg,setInputMsg] = useState('');
//     const usernameStored = useRecoilValue(usernameState);
//     const [currentUserId, setCurrentUserId] = useState(null)
//     const [arrivalMessage, setArrivalMessage] = useState({fromId:-1,toId:-1,content:""})

//     const thisFxnToGetUserId = async()=>{
//         const fromId = await getUserId(usernameStored);
//         setCurrentUserId(fromId)
//     }
//     useEffect(()=>{
//         thisFxnToGetUserId()
//         socket.emit('addUser',currentUserId)
//     },[usernameStored])
    

//     useEffect(()=>{
//         socket.on('getMessage',(data)=>{
//             setArrivalMessage({
//                 fromId:data.senderId,
//                 toId:currentUserId || 0,
//                 content:data.text
//             })
//         })
//     },[])

//     useEffect(()=>{
//         arrivalMessage && Number(props.toId)===arrivalMessage.fromId && 
//         setData((prev)=> [...prev, arrivalMessage]);
//     },[arrivalMessage])

//     const pushMessage = async ()=>{
//         // console.log(usernameStored)
//         const fromId = currentUserId || 0;
//         const toId = Number(props.toId)
//         const content = inputMsg

//         socket.emit('sendMessage',{
//             senderId:fromId,
//             receiverId:toId,
//             text:content
//         })


//         const res = await createMessage(fromId,toId,content)
//         console.log(res)

//         // setData((data)=>{
//         //     const newMessage  =  {
//         //         status:'send',
//         //         content:`${inputMsg}`
//         //     }
//         //     return [...data,newMessage];
//         // });

//     }

//     const getSendMessages = async ()=>{
//         const f = await getUserId(usernameStored);
//         const t = Number(props.toId)

//         const mesgsSend = await getMessage(f,t);
//         const mesgsReceived = await getMessage(t,f)
        
//         setData(()=>{
//             let array1 = mesgsReceived.messages
//             let array2 = mesgsSend.messages
//             let array3 = array1.concat(array2)
//             return array3.sort((a:any, b:any) => a.mesgId - b.mesgId)
//         })
        
//         // console.log(data.sort((a, b) => a.mesgId - b.mesgId))
//         // console.log(mesgsSend);
//         // console.log(mesgsReceived);
//     }   
     
//     useEffect(()=>{
//         getSendMessages();
        
//     },[props.toId])
   
//   return (
//     <div className="bg-slate-500  h-screen w-full ">
//         <div className="flex justify-between h-16 bg-slate-800 text-white">
//             <div className="flex items-center gap-2 m-4">
//                 <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
//                     <span className="font-medium text-gray-600 dark:text-gray-300 text-2xl">{props.username[0].toUpperCase()}</span>
//                 </div>
//                 <div className="text-2xl">
//                     {props.username}
//                 </div>
//             </div>
//             <div className=" flex gap-5 items-center mr-10">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
//                             <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
//                         </svg>

//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
//                             <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
//                         </svg>


//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
//                             < path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
//                         </svg>

            


//             </div>
//         </div>

//         <div  className="flex flex-col h-5/6 overflow-auto scrollbar-hidden  pt-2">
//             {data.map((message:any,index)=>{
//                 if(!(message.toId == Number(props.toId)) ){
//                     return <div key={index} className=" flex justify-start text-lg"> <div className="border-2  border-black max-w-96 rounded-md ml-7 p-2">{message.content}</div></div>
//                 }
//                 else{
//                     return <div key={index} className="  flex justify-end text-lg"> <div className="border-2 border-black max-w-96 rounded-md mr-7 p-2">{message.content}</div> </div>
//                 }
                
//             })}
//         </div>

//         <div className=" flex justify-center pt-2 h-14">
//              <textarea onChange={(e)=>setInputMsg(e.target.value)} value={inputMsg} ref={inputMesgRef} className="border-2 border-black bg-slate-800 text-white rounded-lg w-3/5   resize-none text-xl p-2 items-center " placeholder="Enter message"/>
             
//              <div className="ml-1 ">
//                 <svg onClick={
//                     ()=>{
//                         pushMessage()
//                     }}  
//                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-10  p-2 hover:bg-slate-400 rounded-full">
//                     <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
//                 </svg>
//              </div>

//         </div>
//     </div>
//   )
// }

// export default Chatwindow

import { useEffect, useRef, useState } from "react";
import { createMessage, getMessage, getUserId } from "../../utils";
import { usernameState } from "../../store/atoms/user";
import { useRecoilValue } from "recoil";
import { io } from "socket.io-client";

const socket = io('http://localhost:3000'); // Update with your server URL

function ChatWindow(props:any) {
    const [data, setData] = useState([]);
    const inputMesgRef = useRef(null);
    const [inputMsg, setInputMsg] = useState('');
    const usernameStored = useRecoilValue(usernameState);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [arrivalMessage, setArrivalMessage] = useState({time:10,mesgId:-1, fromId: -1, toId: -1, content: "" });

    const getUserIdAndEmit = async () => {
        const fromId = await getUserId(usernameStored);
        setCurrentUserId(fromId);
        socket.emit('addUser', fromId);
    };

    useEffect(() => {
        getUserIdAndEmit();
    }, [usernameStored]);

    useEffect(() => {
        socket.on('getMessage', (data) => {
            setArrivalMessage({
                mesgId: data[data.length-1].mesgId +1,
                time:10,
                fromId: data.senderId,
                toId: currentUserId || 0,
                content: data.text
            });
        });

        return () => {
            socket.off('getMessage');
        };
    }, [currentUserId]);

    useEffect(() => {
        if ( Number(props.toId) === arrivalMessage.fromId) {
            console.log("hi")
            setData((data)=>{
                const array:any = data
                array.push(arrivalMessage)
                return array
            });
        }
    }, [arrivalMessage, props.toId,data]);

    const pushMessage = async () => {
        const fromId = currentUserId || 0;
        const toId = Number(props.toId);
        const content = inputMsg;

        socket.emit('sendMessage', {
            senderId: fromId,
            receiverId: toId,
            text: content
        });

        const res = await createMessage(fromId, toId, content);
        console.log(res);

        setInputMsg(''); // Clear the input field after sending the message
    };

    const getSendMessages = async () => {
        const f = await getUserId(usernameStored);
        const t = Number(props.toId);

        const mesgsSend = await getMessage(f, t);
        const mesgsReceived = await getMessage(t, f);

        setData(() => {
            const array1 = mesgsReceived.messages;
            const array2 = mesgsSend.messages;
            const array3 = array1.concat(array2);
            return array3.sort((a:any, b:any) => a.mesgId - b.mesgId);
        });
    };

    useEffect(() => {
        getSendMessages();
    }, [props.toId]);

    return (
        <div className="bg-slate-500 h-screen w-full">
            <div className="flex justify-between h-16 bg-slate-800 text-white">
                <div className="flex items-center gap-2 m-4">
                    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <span className="font-medium text-gray-600 dark:text-gray-300 text-2xl">{props.username[0].toUpperCase()}</span>
                    </div>
                    <div className="text-2xl">
                        {props.username}
                    </div>
                </div>
                <div className="flex gap-5 items-center mr-10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </div>
            </div>

            <div className="flex flex-col h-5/6 overflow-auto scrollbar-hidden pt-2">
                {data.map((message:any, index) => (
                    message.toId === Number(props.toId) ? (
                        <div key={index} className="flex justify-end text-lg">
                            <div className="border-2 border-black max-w-96 rounded-md mr-7 p-2">{message.content}</div>
                        </div>
                    ) : (
                        <div key={index} className="flex justify-start text-lg">
                            <div className="border-2 border-black max-w-96 rounded-md ml-7 p-2">{message.content}</div>
                        </div>
                    )
                ))}
            </div>

            <div className="flex justify-center pt-2 h-14">
                <textarea
                    onChange={(e) => setInputMsg(e.target.value)}
                    value={inputMsg}
                    ref={inputMesgRef}
                    className="border-2 border-black bg-slate-800 text-white rounded-lg w-3/5 resize-none text-xl p-2 items-center"
                    placeholder="Enter message"
                />
                <div className="ml-1">
                    <svg
                        onClick={pushMessage}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-10 p-2 hover:bg-slate-400 rounded-full"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default ChatWindow;
