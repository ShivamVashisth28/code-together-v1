import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
// import WaveComponent from "../components/animation/Wave";

function Landing() {

    const data = "Hello coders !! This is the site where you can code together with your team       "
    const [text,setText] = useState("Hello coders");
    const [index,setIndex] = useState(13);

    
  useEffect(() => {
    const interval = setInterval(() => {
      if (index >= data.length) {
        setIndex(13);
        setText("Hello coders");
      } else {
        setText((prev) => prev + data[index]);
        setIndex((prev) => prev + 1);
      }
    }, 50); // Adjust the interval duration as needed

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [index, data]);

  return (

    <div className= { ` flex flex-col bg-gradient-to-br from-purple-600 to-blue-400  h-screen `} >
        <div className="flex justify-between border-b-2 border-white">
          <Link to={'/'}><div className="p-4 text-3xl font-bold cursor-pointer" > CODE TOGETHER </div></Link>  
            <div className="flex">
                
                <Link to={'/login'}> <div className="p-4 text-xl cursor-pointer" > LOGIN </div> </Link>
                <Link to={'/signup'}> <div className="p-4 text-xl cursor-pointer"> SIGNUP </div> </Link>
                
            </div>
        </div>

        <div className="flex justify-center h-2/4 w-3/4 self-center">
            <div className="self-center text-4xl w-1/2 ">
                {text}
            </div>
        </div>

      {/* <WaveComponent/>     */}

    </div>
  )
}

export default Landing