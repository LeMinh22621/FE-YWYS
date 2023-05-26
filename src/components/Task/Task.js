import React from 'react';
import styles from './Task.module.css';
import { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as FIIcons from 'react-icons/fi';
import TaskEditMenu from './task_edit_menu/TaskEditMenu';
const Task = props => {
    const {keyTask,title,isDone,...other}=props

    const [isChecked, setIsChecked] = useState(props.isDone);
    const [currentValue, setCurrentValue] = useState(title);
    const [isEditTaskClick, setIsEditTask] = useState(false);
    const key = props.keyTask;
// console.log(props)
// console.log(keyTask,title,isDone,other.handleDeleteTask)
    const handleEditTask = () =>{
        setIsEditTask(!isEditTaskClick);
    };
    const handleChangeCurrentValue = (event) =>{
        setCurrentValue(event.target.value);
    };
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    const handleDeleteTask = () => {
        // props.handleDeleteTask(key); 
        other.handleDeleteTask(keyTask)
        // setCurrentValue(null)
    };
    return (
        <div key={key} className={styles.card_container}>
            <div className={styles.card_container_wrapper}>
                <input type='checkbox' checked={isChecked} onChange={handleCheckboxChange}/>
                <div className={styles.text_area_wrapper}>
                    <textarea type='text' onInput={(event) => {event.target.parentNode.dataset.replicatedValue = event.target.value}} value={currentValue} onChange={handleChangeCurrentValue}/>
                </div>
                <div className={styles.card_container_icon}>
                    <FaIcons.FaTrash className={styles.icon} size={20} onClick={handleDeleteTask}/>
                    <FIIcons.FiEdit2 className={styles.icon} size={20} onClick={handleEditTask}/>
                </div>
                
                {
                    isEditTaskClick && <TaskEditMenu/>
                }
            </div>
        </div>
    );
}

export default Task;