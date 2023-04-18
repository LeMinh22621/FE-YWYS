import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as IoIcons from 'react-icons/io';
import { useAuth } from '../../../hooks/useAuth';
import authApi from '../../../api/authApi';
import '../Login/index.css';

const Login = () => {

  const {setAuth} = useAuth();

  // navigate
  const navigate = useNavigate();

  // location
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  
  // const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMessage, setErrMessage] = useState('');

  // useEffect( () => {
  //   userRef.current.focus();
  // }, []);

  useEffect( () => {
    setErrMessage('');
  },[email, password]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // send request login to server
      const response = await authApi.login({email, password});

      console.log(response?.token);

      const accessToken = response?.token;

      setAuth({ email, password, accessToken });
      setEmail('');
      setPassword('');
      navigate(from, { replace: true });
    }
    catch (err) {
      if (!err?.response) {
        setErrMessage('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMessage('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMessage('Unauthorized');
      } else {
        setErrMessage('Login Failed');
      }
      errRef.current.focus();
    }
  }


  return (
    <div id='login'>
        <p ref={errRef} className={errMessage ? "errmsg" : "offscreen"} aria-live="assertive">{errMessage}</p>
        <LoginForm setEmail={setEmail} setPassword={setPassword} loginClickFunc={handleLogin} />
    </div>
  );
}

const LoginForm = props => {
  return (
    <div id="loginform">
      <FormHeader title="Login" />
      <Form setEmail={props.setEmail} setPassword={props.setPassword} loginClickFunc={props.loginClickFunc} />
      <OtherMethods />
    </div>
  );
}

const FormHeader = props => (
  <h2 id="headerTitle">{props.title}</h2>
);

const Form = props => (
  <div>
    <FormInput setData={props.setEmail} description="Email" placeholder="Enter your email" type="email" />
    <FormInput setData={props.setPassword} description="Password" placeholder="Enter your password" type="password" />
    <FormButton loginClickFunc={props.loginClickFunc} title="Log in" />
  </div>
);

const FormButton = props => (
  <div id="button" className="row">
    <button onClick={props.loginClickFunc}>{props.title}</button>
  </div>
);

const FormInput = props => (
  <div className="row">
    <label>{props.description}</label>
    <input onChange={e => props.setData(e.target.value)} type={props.type} placeholder={props.placeholder} required/>
  </div>
);

const OtherMethods = props => (
  <div id="alternativeLogin">
    <label>Or sign in with:</label>
    <div id="iconGroup">
      <Google />
    </div>
  </div>
);

function Google() {
  return (
    <div>
      <Link to={"login/google"}>
        {<IoIcons.IoLogoGoogle />}
        <span>{"Google"}</span>
      </Link>
    </div>
  );
}

export default Login;