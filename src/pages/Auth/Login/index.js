import React, { useEffect, useState } from 'react';
import styles from "./index.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../../../actions/LoginActions';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  /**
   * redux
   */
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const isLogingIn = useSelector((state) => state.login.isLogingIn);
  const handleLogin = (e) => {
    e.preventDefault();
    try {
      dispatch(loginRequest(email,password));
    }
    catch (err) {
      toast.error(err);
    }
  }
  useEffect( () => {
    if(isLoggedIn)
      navigate("/home", {replace:true});
      // eslint-disable-next-line
  }, [isLoggedIn])
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
          <button onClick={handleLogin} disabled={isLogingIn} >{isLogingIn?"Logingin":"Login"}</button>
        </div>
      </div>
      <div id={styles.signup}>
        <a href='/signup'>Sign up</a>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Login;