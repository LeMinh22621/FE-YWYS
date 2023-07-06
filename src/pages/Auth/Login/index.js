import React, { useEffect, useState } from 'react';
import styles from "./index.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../../../actions/LoginActions';
import { toast } from 'react-toastify';
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
  const userInfor = useSelector((state) => state.login.user);
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
    {
      console.log(userInfor)
      if(userInfor.role === "USER")
        navigate("/home", {replace:true});
      else
        navigate("/admin", {replace:true})
    }
      
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