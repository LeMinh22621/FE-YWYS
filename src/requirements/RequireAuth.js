import { Navigate } from "react-router-dom"
import { isAuthenticated } from "../utils/auth"

export const RequireAuth = ({children}) => {

    if(!isAuthenticated())
    {
        return <Navigate to='/login'/>
    }
    return children
}