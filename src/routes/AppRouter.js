import React from 'react';
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup/Signup';
import Home from "../pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../hooks/useAuth';
import { RequireAuth } from '../requirements/RequireAuth';
import {UserRequire, AdminRequire} from '../requirements/AuthorizationRequire';
import Room from '../components/room/Room';
import Admin from '../pages/Admin/Admin';

export default function AppRouter(){
    return (
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path="/home" element={ <RequireAuth> <UserRequire><Home/></UserRequire> </RequireAuth>}/>
            <Route path={`/room/:room_id`} element={  <RequireAuth>   <UserRequire> <Room /> </UserRequire></RequireAuth> }/>
            <Route path='/admin' element={  <RequireAuth> <AdminRequire> <Admin /> </AdminRequire> </RequireAuth> }/>
            <Route path="/" element={ <RequireAuth> <UserRequire><Home/></UserRequire> </RequireAuth>}/>
          </Routes>
        </Router>
      </AuthProvider>
    );
}