import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../utils";
import { usernameState, userState } from "../store/atoms/user";
import { useRecoilState, useSetRecoilState } from "recoil";

function Signup() {

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')

    const [isUserValid , setIsUserValid] = useRecoilState(userState);
    const  setRecoilUsername = useSetRecoilState(usernameState);
    
    const navigate = useNavigate()


    const btnclick = async (e:any)=>{
        e.preventDefault();
        const user = await createUser(username,password,email);
        if(user){
          setIsUserValid(true)
          console.log(isUserValid)
          setRecoilUsername(username);
          navigate('/home')
        }else{
          alert('wrong credentials');
        }
    }
    return (
      <div className=" w-screen h-screen grid grid-cols-2 ">
  
        <div className="col-span-1 bg-white flex justify-center">
          <div className="w-1/2 h-4/6  self-center  ">
              <div className="flex flex-col items-center mb-6" >
                <div className="text-4xl font-semibold mb-2  ">Create Your Account</div>
                <div className="text-sm font-semibold  ">Already have an account <Link to={'/login'} className="text-blue-500 border-b-2 border-black">login</Link> here</div>
              </div>
              <form className="flex flex-col gap-4">
                
                <div className="flex flex-col border-2 border-black rounded-md">
                  <div className="text-2xl  m-3">Username</div>
                  <input type="text" placeholder="JohnDoe2" onChange={(e)=>setUsername(e.target.value)} className="mb-2 bg-inherit w-11/12 self-center text-lg focus:outline-none "/>
                </div>
                
                <div className="flex flex-col border-2 border-black rounded-md">
                <div className="text-2xl  m-3">Email Address</div>
                <input type="text" placeholder="JohnDoe@example.com" onChange={(e)=>setEmail(e.target.value)}  className="mb-2 bg-inherit w-11/12 self-center text-lg focus:outline-none " />
                </div>
  
                <div className="flex flex-col border-2 border-black rounded-md">
                <div className="text-2xl  m-3">Create Password</div>
                <input type="password" placeholder="123456" onChange={(e)=>setPassword(e.target.value)}  className="mb-2 bg-inherit w-11/12 self-center text-lg focus:outline-none"/>
                </div>
                
                <button type="button" onClick={(e)=>{
                  btnclick(e);
                }} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                  SignUp
                </button>
              </form>
          </div>
        </div>
        <div className="col-span-1 flex justify-center bg-gradient-to-br from-purple-600 to-blue-500">
          <div className="text-white self-center font-bold text-4xl pl-2 w-1/2 ">The Best Website To Code With Friends And Colleague To Build Big</div>
        </div>
      </div>
    )
}

export default Signup