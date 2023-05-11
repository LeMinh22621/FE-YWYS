import { Navigate } from "react-router-dom"
// import { useAuth } from "../hooks/useAuth"
import { isAuthenticated } from "../utils/auth"

export const RequireAuth = ({children}) => {
    // const auth = useAuth()

    if(!isAuthenticated())
    {
        return <Navigate to='/login'/>
    }
    return children
}