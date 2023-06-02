import React, { useState } from "react";
import styles from "./TaskEditMenu.module.css";
import * as IOIcons from "react-icons/io";
import LabelManager from "./label_manager/LabelManager";
import DateTimeManager from "./date_time_manager/DateTimeManager";

const TaskEditMenu = props => {
    const {labels, dueDate, ...other} = props;
    const [isLabelClick, setIsLabelClick] = useState(false);
    const [isEditDateTimeClick, setIsEditDateTimeClick] = useState(false);

    const handleLabelClick = () => {
        setIsLabelClick(!isLabelClick);
        setIsEditDateTimeClick(false);
    }
    const handleAddCurrentLabelList = (newLabel) => other.handleAddCurrentLabelList(newLabel);
    const handleDeleteCurrentLabelList = (key) => other.handleDeleteCurrentLabelList(key);

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
                isLabelClick && <LabelManager handleLabelClick={handleLabelClick} labels={labels} handleDeleteCurrentLabelList={handleDeleteCurrentLabelList} handleAddCurrentLabelList={handleAddCurrentLabelList} handleEditALabel={other.handleEditALabel}/>
            }
            {
                isEditDateTimeClick && <DateTimeManager dueDate={dueDate} handleEditDueDate={other.handleEditDueDate}/>
            }
        </div>
    );
}

export default TaskEditMenu;