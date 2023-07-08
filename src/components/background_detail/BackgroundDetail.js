import React from "react";
import styles from "./BackgroundDetail.module.css";
import * as AIIcons from 'react-icons/ai';
import { useState } from "react";
import { useEffect } from "react";
import adminApi from "../../api/adminApi";
import { toast } from "react-toastify";
const BackgroundDetail = props => {
    const {title, backgroundData, ...others} = props;
    const [backgroundLink, setBackgroundLink] = useState('');
    const [backgroundImage, setBackgroundImage] = useState(null);
    useEffect(() =>{
        console.log(backgroundData);
        if(backgroundData != null)
        {
            setBackgroundLink(backgroundData.background_link)
            setBackgroundImage(backgroundData.image_link)
        }
        // eslint-disable-next-line
    }, [])
    const [file, setFile] = useState(null);
    const loadImageFromDevice = (e) => {
        //Set File
        setFile(e.target.files[0]);
        //Set newBackgroundImg
        const reader = new FileReader();
        reader.onload = (event) => {
            setBackgroundImage(event.target.result);
        }
        reader.readAsDataURL(e.target.files[0]);
    }
    const handleOKClick = async () => {
        const formData = new FormData();
        const data = {
            background_link: backgroundLink
        }
        formData.append("file", file);
        formData.append("backgroundRequest", new Blob([JSON.stringify(data)], { type: "application/json" }));
  
        adminApi.updateBackground(backgroundData.background_id, formData,
        {
            headers:{
                'Accept': 'application/json, text/plain, image/*, */*',
                "Content-Type": "multipart/form-data"
            }
        }
        ).then((response) => response.json())
        .then((dataResponse) => {
                others.cancelFunc(false)
                console.log(dataResponse);
        }).catch( err => {
                toast.error(err);
        });
    }
    return (
        <div className={styles.background_container}>
            <div className={styles.background_container_wrapper}></div>
            <div className={styles.background_container_content}>
                <div className={styles.header_container}>
                    <h1>{title}</h1>
                    <div className={styles.close_icon} onClick={() => others.cancelFunc(false)}>
                        <AIIcons.AiOutlineCloseCircle/>
                    </div>
                    
                </div>
                <div className={styles.body_container}>
                    <div className={styles.background_image}>
                        <img src={backgroundImage} alt="Avatar"/>
                        <input onChange={loadImageFromDevice} type="file" alt="avatar" accept={['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg']}/>
                    </div>
                    <div className={styles.inputs}>
                        <h2>Youtube Link</h2>
                        <input value={backgroundLink} onChange={(e) => setBackgroundLink(e.target.value)}/>
                    </div>
                    <button onClick={handleOKClick}>OK</button>
                </div>
            </div>
        </div>
    );
}

export default BackgroundDetail;
