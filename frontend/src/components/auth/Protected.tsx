import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Props {
    children: ReactNode;
    isLoggedIn: boolean;
    redirect?: string;
  }

function Protected({children, isLoggedIn , redirect= '/login'} : Props)  {

    if(isLoggedIn){
        return (
            <>{children}</>
        )
    }
    return <Navigate to={redirect} />
}

export default Protected