import { useSetRecoilState } from "recoil"
import { userState } from "../store/atoms/user"
import { useNavigate } from "react-router-dom";


function Home() {
    const setUserState = useSetRecoilState(userState)    ;
    const navigate = useNavigate()
    return (
      <div className="flex h-screen w-screen justify-center items-center bg-gradient-to-r from-purple-500 via-red-500 to-green-500 animate-changeBg custom-background-size ">
        <div className="bg-black p-5  w-2/6 border-4 border-rose-300 rounded-3xl text-white text-2xl ">
                <div className="border-2 border-white rounded-xl p-8 text-center m-8 hover:bg-slate-500 cursor-pointer"> Create Room </div>
                <div className="border-2 border-white rounded-xl p-8 text-center m-8 hover:bg-slate-500 cursor-pointer"> Join Room </div>
                <div onClick={()=>{navigate('/chat/0')}} className="border-2 border-white rounded-xl p-8 text-center m-8 hover:bg-slate-500 cursor-pointer"> Chat Room </div>
        </div>

        <div className="text-3xl cursor-pointer hover:bg-slate-400" onClick={()=>{setUserState(!userState)}}>logout</div>
      </div>
    )
}

export default Home