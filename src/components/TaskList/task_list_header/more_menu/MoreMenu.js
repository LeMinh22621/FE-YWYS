import React from "react";
import styles from "./MoreMenu.module.css";
import * as FaIcons from 'react-icons/fa';

const MoreMenu = props => {
    const handleDeleteTaskList = () => {
        props.handleDeleteTaskList();
    }
    return (
        <div className={styles.menu_more_container}>
            <div className={styles.menu_more_container_wrapper}>
                <div className={styles.menu_more_item} onClick={handleDeleteTaskList}><FaIcons.FaTrash /> Delete</div>
                <div className={styles.menu_more_item}><FaIcons.FaSort/> Sort</div>
            </div>
        </div>
    );
}
export default MoreMenu;