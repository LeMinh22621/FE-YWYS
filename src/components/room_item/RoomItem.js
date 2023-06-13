import React from "react";
import styles from "./RoomItem.module.css";
import roomApi from "../../api/roomApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RoomItem = props => {
    const { roomId, avatar, backgroundImage, members, title, description} = props;
    const navigate = useNavigate();
    const handleRoomClick = async () => {
        try{
            
            const respone = await roomApi.getDetailRoom(roomId);
            if(respone.status)
            {
                toast.success(respone.message);
                navigate(`/room/${roomId}`, {replace:true});
            }
            else{
                toast.error(respone.message);
            }
        }
        catch(err)
        {
            toast.error(err);
        }
    }
    return (
        <div onClick={handleRoomClick} className={styles.room_item_container}>
            <div className={styles.room_item_container_wrapper} >
                <div className={styles.background_image} style={{backgroundImage: `url(${backgroundImage})`}}/>
                <div className={styles.avatar} style={{backgroundImage: `url(${avatar})`}}/>
                <div className={styles.body_item}>
                    <div className={styles.members_container}>
                        <div className={styles.green_round}/>
                        <span>{members} members</span>
                    </div>
                    <div className={styles.title}>
                        <span>{title}</span>
                    </div>
                    <div className={styles.desctiption}>
                        <span>{description}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default RoomItem;