import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as IoIcons from 'react-icons/io';
import { useAuth } from '../../../hooks/useAuth';
import authApi from '../../../api/authApi';
import styles from "./index.module.css";
import { setToken } from '../../../utils/auth';

const Login = props => {
  const { setAuth } = useAuth();
  // navigate
  const navigate = useNavigate();
  // location
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // send request login to server
      const response = await authApi.login({ email, password });

      console.log(response?.token);

      const accessToken = response?.token;
      setToken(accessToken);

      setAuth({ email, password, accessToken });
      setEmail('');
      setPassword('');
      navigate(from, { replace: true });
    }
    catch (err) {
      console.log(err);
    }
  }


  return (
    <div id={styles.loginform}>
      <h2 id={styles.headerTitle}>Login</h2>
      <div>
        <div className={styles.email}>
          <label>{"Email"}</label>
          <input onChange={e => setEmail(e.target.value)} type={"email"} placeholder={"Enter your email"} required />
        </div>
        <div className={styles.password}>
          <label>{"Password"}</label>
          <input onChange={e => setPassword(e.target.value)} type={"password"} placeholder={"Enter your password"} required />
        </div>
        <div id={styles.button} className={styles.password}>
          <button onClick={handleLogin}>{"Login"}</button>
        </div>
      </div>
      <div id={styles.signup}>
        <a href='/signup'>Sign up</a>
      </div>
    </div>
  );
}

export default Login;