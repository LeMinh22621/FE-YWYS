import React from "react";
import styles from "./RoomItem.module.css";

const RoomItem = props => {
    const {avatar, backgroundImage, members, title, description} = props;

    return (
        <div className={styles.room_item_container}>
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