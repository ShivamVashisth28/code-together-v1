import { Link } from "react-router-dom"

function NotFound() {
  return (
    <div className=" w-screen h-screen grid grid-cols-2 ">
      <div className="col-span-2 bg-white flex flex-col justify-center">
        <div className="self-center text-5xl">404 | Page Not Found</div>
        <div className="self-center flex gap-3 text-lg mt-3"><Link to={'/'}>Home</Link> <Link to={'/login'}>Login</Link> <Link to={'/signup'}>Signup</Link></div>
      </div>
      
  </div>
  )
}

export default NotFound