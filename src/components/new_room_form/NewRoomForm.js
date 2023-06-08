import React from "react";
import styles from "./NewRoomForm.module.css";
import * as IOIcons from "react-icons/io";
import roomApi from "../../api/roomApi";
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NewRoomForm = props => {
    const {...other} = props;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const navigate = useNavigate();
    const [data, setData] = useState({
        title: title,
        description: description,
        is_public: isPublic
    });
    const handleCreateRoom = async () => {
        if(data.description === '' || data.title === '')
        {
            toast.error("please full fill out!");
            navigate("/login", {replace: true});
            return;
        }
        try{
            const response = await roomApi.createRoom(data);
            
            console.log(response.data);
        }
        catch(err)
        {
            toast.error(err);
        }
    }
    useEffect( () => {
        setData({
            title: title,
            description: description,
            is_public: isPublic
        });
        // eslint-disable-next-line
    },[title, description, isPublic])
    return (
        <div className={styles.form_container}>
            <div className={styles.form_container_wrapper}>
                <div className={styles.form_header_container}>
                    <h2>New Room</h2>
                    <div className={styles.header_close_icon} onClick={other.closeNewRoomForm}>
                        <IOIcons.IoIosClose/>
                    </div>
                </div>
                <div className={styles.body_container}>
                    <div className={styles.body_container_wrapper}>
                        <div className={styles.title}>
                            <h3>Title</h3>
                            <div className={styles.text_area_wrapper} style={{height: 'calc(2vh + 2vw)'}}>
                                <textarea type='text' onInput={(event) => { event.target.parentNode.dataset.replicatedValue = event.target.value }} value={title} onChange={(e)=>setTitle(e.target.value)}/>
                            </div>
                        </div>
                        <div className={styles.description}>
                            <h3>Description</h3>
                            <div className={styles.text_area_wrapper}>
                                <textarea type='text' onInput={(event) => { event.target.parentNode.dataset.replicatedValue = event.target.value }} value={description} onChange={(e) => setDescription(e.target.value)}/>
                            </div>
                        </div>
                        <div className={styles.radio_container}>
                            <label className={styles.radio_label} >
                                <input type="radio" name="choice" value={false} onChange={() => setIsPublic(false)} checked={!isPublic}/>
                                <span>Private</span>
                            </label>
                            <label className={styles.radio_label}>
                                <input type="radio" name="choice" value={true} onChange={() => setIsPublic(true)} checked={isPublic}/>
                                <span>Public</span>
                            </label>
                        </div>

                        <div className={styles.button_container}>
                            <div className={styles.button_container_wrapper} onClick={handleCreateRoom}>
                                <button>OK</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
}

export default NewRoomForm;