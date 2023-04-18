import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"


export const RequireAuth = ({children}) => {
    const auth = useAuth()

    if(!auth)// || auth.isExpiredToken())
    {
        return <Navigate to='/login'/>
    }
    return children
}