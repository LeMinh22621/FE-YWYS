import { Navigate } from "react-router-dom";
import { decodeToken, getToken } from "../utils/auth"

export const AdminRequire = ({children}) => {

    const userInf = decodeToken(getToken());
    console.log(userInf);
    if(userInf.role === "ADMIN")
        return children;
    else
        return <Navigate to='/login'/>;
}

export const UserRequire = ({children}) => {

    const userInf = decodeToken(getToken());
    if(userInf.role === "USER")
        return children;
    else
        return <Navigate to='/login'/>;
}