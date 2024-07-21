import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { validUser } from "../utils";
import { useRecoilState, useSetRecoilState } from "recoil";
import { usernameState, userState } from "../store/atoms/user";

function Login() {
  
  const [username ,setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUserValid , setIsUserValid] = useRecoilState(userState);
  const  setRecoilUsername = useSetRecoilState(usernameState);


  const navigate = useNavigate();

  const btnclick = async(e:any)=>{
    e.preventDefault();
    const value :any = await validUser(username,password);
    console.log(value)
    if(!value){
      alert('wrong credentials');
    }else{
      setRecoilUsername(username)
      setIsUserValid(value);
    } 
  }

  useEffect(()=>{
    if(isUserValid){
      navigate('/home');
    }
  },[isUserValid])


  return (
    <div className=" w-screen h-screen grid grid-cols-2 ">

      <div className="col-span-1 bg-white flex justify-center">
        <div className="w-1/2 h-4/6  self-center  ">
            <div className="flex flex-col items-center mb-6" >
              <div className="text-4xl font-semibold mb-2 "> Login Here</div>
              <div className="text-sm font-semibold  ">Don't have an account <Link to={'/signup'} className="text-blue-500 border-b-2 border-black">signup</Link> here</div>
            </div>
            <form className="flex flex-col gap-4">
              
              <div className="flex flex-col border-2 border-black rounded-md">
                <div className="text-2xl  m-3">Username</div>
                <input type="text" onChange={(e)=>{setUsername(e.target.value)}} placeholder="demo" className="mb-2 bg-inherit w-11/12 self-center text-lg focus:outline-none "/>
              </div>


              <div className="flex flex-col border-2 border-black rounded-md">
              <div className="text-2xl  m-3">Password</div>
              <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="123456" className="mb-2 bg-inherit w-11/12 self-center text-lg focus:outline-none"/>
              </div>
              
              <button type="button" onClick={(e)=>{
                btnclick(e);
              }} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                Login
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

export default Login