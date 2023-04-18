import { createContext, useContext, useState } from "react";

const authContext = createContext({});

export const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState({});

  return <authContext.Provider value={{auth, setAuth}}>
    {children}
  </authContext.Provider>
}

export const useAuth = () =>{
  return useContext(authContext)
}