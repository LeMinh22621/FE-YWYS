import React, { useState } from "react";
import styles from "./TaskListHeader.module.css";
import * as FaIcons from 'react-icons/fa';
import * as FIIcons from 'react-icons/fi';
import MoreMenu from "./more_menu/MoreMenu";

const TaskListHeader = props => {
    const [isMoreIconClick, setIsMoreIconClick] = useState(false);
    const onMoreIconClick = () => {
        setIsMoreIconClick(!isMoreIconClick);

    }
    const handleAddTask = () => {
        props.handleAddTask();
    }
    const handleDeleteTaskList = () => {
        props.handleDeleteTaskList();
    }
    return (
        <div className={styles.list_header_container}>
            <div className={styles.list_header_container_wrapper}>
                <h3>{props.title}</h3>
                <div className={styles.more_menu_container}>
                
                <div className={styles.icon_container}>
                    <FaIcons.FaPlusCircle className={styles.plus_icon} size={25} onClick={handleAddTask} />
                    <FIIcons.FiMoreHorizontal className={styles.more_icon} size={25} onClick={onMoreIconClick} />
                </div>
                {
                    isMoreIconClick && <MoreMenu handleDeleteTaskList = {handleDeleteTaskList}/>
                }

                </div>
               
            </div>
        </div>
    );
}

export default TaskListHeader; 