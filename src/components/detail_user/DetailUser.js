import React, { useEffect, useState } from "react";
import styles from "./DetailUser.module.css"
import * as AIIcons from 'react-icons/ai';
import adminApi from "../../api/adminApi";
import { toast } from "react-toastify";
import { hover } from "@testing-library/user-event/dist/hover";
const DetailUser = props => {
    const {userData, ...others} = props;
    console.log(userData);
    const [currentUserData, setCurrentUserData] = useState(userData);
    const [newPassword, setNewPassword] = useState('********');
    useEffect( () => {
        setCurrentUserData({
            id: userData.id,
            first_name: userData.first_name,
            last_name: userData.last_name,
            email: userData.email,
            url_avatar: userData.url_avatar
        })
    }, [userData]);

    const [isEditClicked, setIsEditClicked] = useState(true);
    const handleSaveUser = () => {
        const saveUser = async () => {
            const response = await adminApi.saveUser(userData.id, currentUserData);
            if(response.data)
            {
                setIsEditClicked(!isEditClicked);
                others.setCurrentUser(response.data);
            }
            else{
                toast.error(response.message);
            }
        }
        saveUser();
    }
    return (
        <div className={styles.detail_user_container}>
            <div className={styles.background_container}>
            </div>
            <div className={styles.content_container}>
                <div className={styles.header_container}>
                    <h2>Profile</h2>
                    <div className={styles.header_close_icon} onClick={() => others.cancelFunc(false)}>
                        <AIIcons.AiOutlineCloseCircle/>
                    </div>
                </div>
                <div className={styles.body_container}>
                    <div className={styles.avatar_image}>
                        <img 
                        src={userData?.url_avatar} 
                        alt="Avatar"/>
                        <input
                            ref={null}
                            disabled={isEditClicked}
                            type="file" 
                            alt={null} 
                            id="file" 
                            name="file"
                            accept={['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg']}/>
                    </div>
                    <div className={styles.row_zone}>
                        <div className={styles.an_row}>
                            <h3>First Name</h3>
                            <input 
                            disabled={isEditClicked}
                            placeholder="First Name"
                            value={currentUserData.first_name} 
                            onChange={(e) => setCurrentUserData({...currentUserData, first_name: e.target.value})}/>
                        </div>
                        <div className={styles.an_row}>
                            <h3>Last Name</h3>
                            <input 
                            disabled={isEditClicked} 
                            placeholder="Last Name"
                            value={currentUserData.last_name} 
                            onChange={(e) => setCurrentUserData({...currentUserData, last_name: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className={styles.row_zone}>
                        <div className={styles.an_row}>
                            <h3>Email</h3>
                            <input 
                            disabled={isEditClicked} 
                            placeholder="Email" 
                            value={currentUserData.email} 
                            onChange={(e) => setCurrentUserData({...currentUserData, email: e.target.value})}/>
                        </div>
                        <div className={styles.an_row}>
                            <h3>Password</h3>
                            <input 
                                disabled={isEditClicked} 
                                placeholder="Password" 
                                type="password"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}/>
                        </div>
                    </div>
                    <div className={styles.row_zone_button}>
                        {
                            !isEditClicked && <button 
                                onClick={handleSaveUser}
                                style={{background:"#f74444"}}
                            >Save</button>
                        }
                        
                        <button onClick={()=>setIsEditClicked(!isEditClicked)}>Edit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailUser;