import React from "react";
import styles from "./TaskEditMenu.module.css";
import * as IOIcons from "react-icons/io";

const TaskEditMenu = props => {
    return (
        <div className={styles.menu_container}>
            <div className={styles.menu_container_wrapper}>
                <div className={styles.menu_item} ><IOIcons.IoMdPricetags /> Label</div>
                <div className={styles.menu_item}><IOIcons.IoMdCalendar/> Date time</div>
            </div> 
        </div>
    );
}

export default TaskEditMenu;