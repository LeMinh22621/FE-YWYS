import React, { useEffect, useState } from "react";
import styles from "./Signup.module.css";
import * as AIIcons from "react-icons/ai";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { SignupRequest } from "../../../actions/SignupActions";
import { useNavigate } from "react-router-dom";

const Signup = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [data, setData] =  useState({
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName
    })
    const navigate = useNavigate();
    /**
     * redux
     */
    const dispatch = useDispatch();
    const isSigningUp = useSelector((state) => state.signup.isRegistering);
    const isRegistered = useSelector((state) => state.signup.isRegistered);
    const onSubmitClick = (event) =>{
        event.preventDefault();
        {
            /**
             * Check email
             */
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailPattern.test(email))
            {
                toast.error("Invalid email!");
                return;
            }
            /**
             * Check password
             */
            if(password !== rePassword)
            {
                toast.error("Password doesn't match!");
                return;
            }
            else if(password.length < 8 || password.length > 20){
                toast.error("Password length must > 8 and < 20");
                return;
            }
             /**
             * Check first name
             */
            if(firstName === '' || firstName === null){
                toast.error("first name must not empty");
                return;
            }
            /**
             * Check last name
             */
            if(lastName === '' || lastName === null){
                toast.error("last name must not empty");
                return;
            }
            /**
             * Call API
             */
            dispatch(SignupRequest(data));
        }
    }
    useEffect( () => {
        setData({
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName
        });
    },[email, password, firstName, lastName]);
    useEffect( () => {
        if(isRegistered)
            navigate("/login", {replace:true});
            // eslint-disable-next-line
    }, [isRegistered]) ;
    const [isShowPassword, setIsShowPassword] = useState(false);
    const handleShowPass = () => setIsShowPassword(!isShowPassword)
    return (
        <div className={styles.signup_container}>
            <div className={styles.signup_container_wrapper}>
                <h2 id={styles.headerTitle}>Sign up</h2>
                <div className={styles.first_last_name}>
                    <input onChange={(e)=>setFirstName(e.target.value)} value={firstName} type={"text"} placeholder={"First Name"}></input>
                    <input onChange={(e)=>setLastName(e.target.value)} value={lastName} type={"text"} placeholder={"Last Name"}></input>
                </div>
                <div className={styles.email_wrapper}>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} type={"email"} placeholder={"Email"}></input>
                </div>
                <div className={styles.password_container}>
                    <div className={styles.password_wrapper}>
                        <input onChange={(e)=>setPassword(e.target.value)} value={password} type={isShowPassword?"text":"password"} placeholder={"Password"}></input>
                        <div className={styles.show_pass_icon} onClick={handleShowPass}>
                            {
                                isShowPassword?<AIIcons.AiFillEye size={25}/>:<AIIcons.AiFillEyeInvisible size={25}/>
                            }
                        </div>
                    </div>
                    <div className={styles.password_wrapper}>
                        <input onChange={(e)=>setRePassword(e.target.value)} value={rePassword} type={isShowPassword?"text":"password"} placeholder={"Replace Password"}></input>
                        <div className={styles.show_pass_icon} onClick={handleShowPass}>
                            {
                                isShowPassword?<AIIcons.AiFillEye size={25}/>:<AIIcons.AiFillEyeInvisible size={25}/>
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.signup_button}>
                    <button onClick={onSubmitClick} disabled={isSigningUp}>{isSigningUp ? 'Signing Up...' : 'Sign Up'}</button>
                </div>
                <div id={styles.login}>
                    <a href='/login'>Login</a>
                </div>
            </div>
        </div>
    );
}

export default Signup;