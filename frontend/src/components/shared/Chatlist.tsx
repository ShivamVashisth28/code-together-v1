import { useNavigate } from "react-router-dom"
import Chatitem from "./Chatitem"
import Search from "./Search"
import { useEffect, useState } from "react"
import { getAllUsers } from "../../utils"

function Chatlist() {
  
  const navigate = useNavigate()

  const [users,setUsers] = useState([]);

  const getUsersFxn = async()=>{
    const data = await getAllUsers()
    setUsers(data.users)
  }
  useEffect(()=>{
    getUsersFxn();
  },[])

  return (
    <div className="h-screen flex flex-col">

        <div className="flex pt-2  gap-2 ml-3 ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             className="size-9 m-2 cursor-pointer" onClick={()=>{navigate('/home')}}>
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <Search/>
        </div>

        <div className=" overflow-auto max-h-full mt-2 ">
            {users.map((user)=>{
            return <Chatitem key={user.id} username= {user.username} userId={user.id} />
            })}
        </div>

    </div>
  )
}

export default Chatlist