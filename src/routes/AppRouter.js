import React from 'react';
import Login from '../pages/Auth/Login';
import Home from "../pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../hooks/useAuth';
import { RequireAuth } from '../requirements/RequireAuth';
import Signup from '../pages/Auth/Signup/Signup';
export default function AppRouter(){
    return (
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path="/home" element={ <RequireAuth> <Home/> </RequireAuth>}/>
            <Route path="/" element={  <RequireAuth> <Home/> </RequireAuth> }/>
          </Routes>
        </Router>
      </AuthProvider>
    );
}