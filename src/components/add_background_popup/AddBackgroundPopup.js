import React, { useState } from "react";
import styles from "./AddBackgroundPopup.module.css";
import * as AIIcons from "react-icons/ai";
import adminApi from "../../api/adminApi";
import { toast } from "react-toastify";

const AddBackgroundPopup = props => {
    const {currentTheme, currentBackgrounds, ...others} = props;
    const [newBackgroundLink, setNewBackgroundLink] = useState('');
    const [newBackgroundImg, setNewBackgroundImg] = useState('');
    const [file, setFile] = useState(null);

    const handleCloseClick = () => {
        others.setIsBackgroundAddClick(false);
    }
    const loadImageFromDevice = (e) => {
        //Set File
        setFile(e.target.files[0]);
        //Set newBackgroundImg
        const reader = new FileReader();
        reader.onload = (event) => {
            setNewBackgroundImg(event.target.result);
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    const handleSaveNewBackground = () => {
        const formData = new FormData();
        const data = {
            background_link: newBackgroundLink,
            theme_id: currentTheme?.theme_id
        }
        formData.append("file", file);
        formData.append("backgroundRequest", new Blob([JSON.stringify(data)], { type: "application/json" }));

        adminApi.saveNewBackground(formData,
            {
                headers:{
                    'Accept': 'application/json, text/plain, image/*, */*',
                    "Content-Type": "multipart/form-data"
                }
            }
        )
        .then(dataResponse => {
            if(dataResponse.status)
            {
                others.setCurrentBackgrounds([...currentBackgrounds, dataResponse.data])
                others.setIsBackgroundAddClick(false);
            }
            
            console.log(dataResponse);
            return dataResponse;
        }).catch( err => {
            toast.error(err);
        });
    }

    return (
        <div className={styles.add_background_container}>
           <div className={styles.add_background_container_wrapper}>
                <div className={styles.header_container}>
                    <h1>NEW BACKGROUND</h1>
                    <div className={styles.close_icon} onClick={handleCloseClick}>
                        <AIIcons.AiOutlineCloseCircle/>
                    </div>
                    
                </div>
                <div className={styles.body_container}>
                    <div className={styles.background_image}>
                        <img src={newBackgroundImg} alt="Avatar"/>
                        <input onChange={loadImageFromDevice} type="file" alt="avatar" accept={['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg']}/>
                    </div>
                    <div className={styles.inputs}>
                        <h2>Youtube Link</h2>
                        <input value={newBackgroundLink} onChange={(e) => setNewBackgroundLink(e.target.value)}/>
                    </div>
                    <button onClick={handleSaveNewBackground}>Add</button>
                </div>
           </div>
        </div>
    );
}

export default AddBackgroundPopup;