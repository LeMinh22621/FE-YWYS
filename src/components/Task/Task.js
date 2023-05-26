import React from 'react';
import styles from './Task.module.css';
import { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as FIIcons from 'react-icons/fi';
const Task = props => {
    const [isChecked, setIsChecked] = useState(props.isDone);
    const [currentValue, setCurrentValue] = useState(props.title);
    const key = props.keyTask;

    const handleChangeCurrentValue = (event) =>{
        setCurrentValue(event.target.value);
    };
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    const handleDeleteTask = () => {
        props.handleDeleteTask(key); 
    };
    return (
        <div key={key} className={styles.card_container}>
            <div className={styles.card_container_wrapper}>
                <input type='checkbox' checked={isChecked} onChange={handleCheckboxChange}/>
                <textarea type='text' value={currentValue} onChange={handleChangeCurrentValue}/>
                <FaIcons.FaTrash className={styles.icon} size={20} onClick={handleDeleteTask}/>
                <FIIcons.FiEdit2 className={styles.icon} size={20} />
            </div>
        </div>
    );
}

export default Task;