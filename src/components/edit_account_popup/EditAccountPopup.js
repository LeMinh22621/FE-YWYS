import React from "react";
import styles from "./EditAccountPopup.module.css";
import * as AIIcons from "react-icons/ai";
import adminApi from "../../api/adminApi";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";

const EditAccountPopup = props => {
    const {userData, ...others} = props;
    const [currentUserData, setCurrentUserData] = useState(userData);
    useEffect( () => {
        setCurrentUserData({
            id: userData.id,
            first_name: userData.first_name,
            last_name: userData.last_name,
            email: userData.email,
            url_avatar: userData.url_avatar
        })
    }, [userData])
    const handleCloseClick = () => {
        others.setIsEditClick(false);
    }
    const handleSaveUser = () => {
        const saveUser = async () => {
            const response = await adminApi.saveUser(userData.id, currentUserData);
            if(response.data)
            {
                others.setIsEditClick(false);
                others.setCurrentUser(response.data);
            }
            else{
                toast.error(response.message);
            }
        }
        saveUser();
    }
    return (
        <div className={styles.edit_account_container}>
           <div className={styles.edit_account_container_wrapper}>
                <div className={styles.header_container}>
                    <div className={styles.close_icon} onClick={handleCloseClick}>
                        <AIIcons.AiOutlineCloseCircle/>
                    </div>
                </div>
                <div className={styles.body_container}>
                    <div className={styles.avatar_image}>
                        <img src={userData?.url_avatar} alt="Avatar"/>
                        <input type="file" alt="..." accept={['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg']}/>
                    </div>
                    <div className={styles.inputs}>
                        <input value={currentUserData.email} onChange={(e) => setCurrentUserData({...currentUserData, email: e.target.value})}/>
                        <input value={currentUserData.first_name} onChange={(e) => setCurrentUserData({...currentUserData, first_name: e.target.value})}/>
                        <input value={currentUserData.last_name} onChange={(e) => setCurrentUserData({...currentUserData, last_name: e.target.value})}/>
                    </div>
                    <button onClick={handleSaveUser}>Save</button>
                </div>
           </div>
        </div>
    );
}

export default EditAccountPopup;