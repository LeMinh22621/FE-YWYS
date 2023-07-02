import React from 'react';
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup/Signup';
import Home from "../pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../hooks/useAuth';
import { RequireAuth } from '../requirements/RequireAuth';
import Room from '../components/room/Room';
import Admin from '../pages/Admin/Admin';

export default function AppRouter(){
    return (
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path="/home" element={ <RequireAuth> <Home/> </RequireAuth>}/>
            <Route path={`/room/:room_id`} element={  <RequireAuth> <Room /> </RequireAuth> }/>
            <Route path='/admin' element={  <RequireAuth> <Admin /> </RequireAuth> }/>
            <Route path="/" element={  <RequireAuth> <Home/> </RequireAuth> }/>
          </Routes>
        </Router>
      </AuthProvider>
    );
}