import React, { useState } from "react";
import styles from "./TaskListHeader.module.css";
import * as FaIcons from 'react-icons/fa';
import roomApi from "../../../api/roomApi";
import { toast } from "react-toastify";

const TaskListHeader = props => {
    const {keyTaskList, title, ...others} = props;

    const [isChangedTitle, setIsChangedTitle] = useState(false);

    const handleAddTask = () => {
        others.handleAddTask();
    }
    const handleDeleteTaskList = () => {
        const deleteTaskManager = async () => {
            const respone = await roomApi.deleteTaskManager(keyTaskList);
            console.log(respone);
            if(respone.status)
                toast.success(`Delete Task list ${respone.data.task_manager_title}`);
            else
                toast.error(respone.message);
        }
        deleteTaskManager();
        others.handleDeleteTaskList();
    }
    const handleChangeTitle = (event) => {
        setIsChangedTitle(true);
        others.handleChangeTitle(event.target.value);
    }
    const handleSaveTaskManager = async () => {
        const saveTaskManagerTitle = async () => {
            const resposne = await roomApi.updateTaskManager(keyTaskList, {task_manager_title: title});
            console.log(resposne);
            if(!resposne.status)
                toast.error(resposne.message);
            else{
                others.handleSaveTaskListTitle(keyTaskList, resposne.data.task_manager_title);
            }
        }
        saveTaskManagerTitle();

        setIsChangedTitle(false);
    }
    return (
        <div className={styles.list_header_container}>
            <div className={styles.list_header_container_wrapper}>
                <div className={styles.text_area_wrapper}>
                    <textarea type='text' onInput={(event) => { event.target.parentNode.dataset.replicatedValue = event.target.value }} value={title} onChange={handleChangeTitle} />
                </div>
                <div className={styles.more_menu_container}>
                    <div className={styles.icon_container}>
                        <FaIcons.FaPlusCircle className={styles.plus_icon} size={25} onClick={handleAddTask} />
                        <FaIcons.FaTrash className={styles.more_icon} size={20} onClick={handleDeleteTaskList}/>
                    </div>
                    {
                        isChangedTitle && <button type="button" onClick={handleSaveTaskManager}>Save</button>
                    }
                </div>
               
            </div>
        </div>
    );
}

export default TaskListHeader; 