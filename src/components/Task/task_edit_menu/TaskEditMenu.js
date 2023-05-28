import React, { useState } from "react";
import styles from "./TaskEditMenu.module.css";
import * as IOIcons from "react-icons/io";
import LabelManager from "./label_manager/LabelManager";

const TaskEditMenu = props => {
    const [isLabelClick, setIsLabelClick] = useState(false);
    const [isEditDateTimeClick, setIsEditDateTimeClick] = useState(false);

    const handleLabelClick = () => {
        setIsLabelClick(!isLabelClick);
        setIsEditDateTimeClick(false);
    }
    const handleEditDateTimeClick = () => {
        setIsEditDateTimeClick(!isEditDateTimeClick);
        setIsLabelClick(false);
    }
    return (
        <div className={styles.menu_container}>
            <div className={styles.menu_container_wrapper}>
                <div className={styles.menu_item} onClick={handleLabelClick}><IOIcons.IoMdPricetags /> Label</div>
                <div className={styles.menu_item} onClick={handleEditDateTimeClick}><IOIcons.IoMdCalendar/> Date time</div>
            </div> 
            {
                isLabelClick && <LabelManager handleLabelClick={handleLabelClick}/>
            }
        </div>
    );
}

export default TaskEditMenu;