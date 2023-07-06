import React from "react";
import styles from "./Admin.module.css";
import { useState } from "react";
import AccountManagerment from "../../components/account_managerment/AccountManagerment";
import BackgroundManagerment from "../../components/background_managerment/BackgroundManagerment";
import authApi from "../../api/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/LoginActions";
import { useDispatch } from "react-redux";
import MotivationalQuoteManagerment from "../../components/motivational_quote_managerment/MotivationalQuoteManagerment";

const Admin = props => {
    const navigation = useNavigate();
    const navBarItems = ['', 'Accounts', 'Backgrounds', 'Motivational Quote', ''];
    const [activeItem, setActiveItem] = useState(1);
    const dispatch = useDispatch();
    const handleLogout = () => {
        authApi.logout()
            .then(response => {
                if(response.status)
                {
                    dispatch(logout());
                    navigation("/login", {replace: true});
                }
                else{
                    toast.error(response.message);
                }
            })
            .catch(
                err => 
                {
                    toast.error(err);
                }
            );
    }
    return (
        <div className={styles.admin_container}>
            <div className={styles.admin_container_wrapper}>
                <div className={styles.navbar_container}>
                    <div className={styles.navbar_menu}>
                        {
                            navBarItems.map( (narBarItem, index) =>
                                (
                                    <div key={index} className= {styles.navbar_item} 
                                        style={
                                            index === activeItem-2? {
                                                cursor: `${activeItem === 3?'pointer':'default'}`
                                            }:index === activeItem-1? {
                                                borderEndEndRadius: 'calc(1.5vw + 1.5vh)',
                                                cursor: `${activeItem === 2 || activeItem === 3?'pointer':'default'}`
                                            }: index === activeItem? {
                                                borderStartStartRadius: 'calc(1.5vw + 1.5vh)',
                                                borderStartEndRadius: 'calc(1.5vw + 1.5vh)',
                                                backgroundColor: 'transparent'
                                            }: index === activeItem + 1?{
                                                borderEndStartRadius: 'calc(1.5vw + 1.5vh)',
                                                cursor: `${activeItem === 1|| activeItem === 2?'pointer':'default'}`,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                flexWrap: 'nowrap'
                                            }:index === activeItem + 2?{
                                                cursor: `${activeItem === 1?'pointer':'default'}`,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                flexWrap: 'nowrap'
                                            }:{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                flexWrap: 'nowrap'
                                            }
                                        }
                                        onClick={
                                            () => 
                                            {
                                                if(index === (0||4))
                                                    return;
                                                else if(index === 1)
                                                    setActiveItem(1);
                                                else if(index === 2)
                                                    setActiveItem(2);
                                                else if(index === 3)
                                                    setActiveItem(3);
                                            }
                                        }
                                    >
                                        {narBarItem}
                                        {
                                            index === 4 && <button onClick={handleLogout}>Logout</button>
                                        }
                                    </div>
                                )
                            )
                        }
                    </div>
                </div>
                <div className={styles.body_container}>
                {
                    activeItem === 1?
                    <AccountManagerment/>
                    :activeItem === 2?
                    <BackgroundManagerment/>
                    :
                    <MotivationalQuoteManagerment/>
                }
                </div>
            </div>
        </div>
    );
}
export default Admin;