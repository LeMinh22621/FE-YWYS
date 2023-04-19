import React from 'react';
import Login from '../pages/Auth/Login';
import Home from "../pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../hooks/useAuth';
import { RequireAuth } from '../requirements/RequireAuth';
export default function AppRouter(){
    return (
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path="/home" element={ <RequireAuth> <Home/> </RequireAuth>}/>
            <Route path="/" element={  <RequireAuth> <Home/> </RequireAuth> }/>
          </Routes>
        </Router>
      </AuthProvider>
    );
}