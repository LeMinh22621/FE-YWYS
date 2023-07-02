import React from "react";
import styles from "./RoomItem.module.css";
import roomApi from "../../api/roomApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as FaIcons from 'react-icons/fa';

const RoomItem = props => {
    const { isPublicRoomItem, myRoomList, roomId, avatar, backgroundImage, members, title, description, ...others} = props;
    const navigate = useNavigate();
    const handleRoomClick = async () => {
        try{
            
            const respone = await roomApi.getDetailRoom(roomId);
            if(respone.status)
            {
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
    const handleDeleteRoom = async () => {
        try{
            const response = await roomApi.deleteRoomByRoomId(roomId);
            console.log(response);
            if(response.status)
            {
                toast.success(response.message);
                others.setMyRoomList(myRoomList.filter(room => room.room_id !== roomId));
            }
            else{
                toast.error(response.message);
            }
        }
        catch(err)
        {
            toast.error(err);
        }
    }
    return (
        <div key={roomId} className={styles.room_item_container}>
            {
                !isPublicRoomItem&&
                <div className={styles.delete_icon} onClick={handleDeleteRoom}>
                    <FaIcons.FaTrash />
                </div>
            }
            
            <div className={styles.room_item_container_wrapper} onClick={handleRoomClick} >
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