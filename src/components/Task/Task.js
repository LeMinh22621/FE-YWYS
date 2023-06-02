import React, { useEffect } from 'react';
import styles from './Task.module.css';
import { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as FIIcons from 'react-icons/fi';
import TaskEditMenu from './task_edit_menu/TaskEditMenu';
const Task = props => {
    const { keyTask, title, isDone, labels, dueDate, ...other } = props;
    const [isChecked, setIsChecked] = useState(isDone);
    const [currentValue, setCurrentValue] = useState(title);

    const [isEditTaskClick, setIsEditTask] = useState(false);
    const [isDueDateClick, setIsDueDateClick] = useState(false);
    const [isLabelClick, setIsLabelClick] = useState(false);

    const [currentLabelList, setCurrentLabelList] = useState(labels);
    const [currentDueDate, setCurrentDueDate] = useState(dueDate);

    // label list
    const handleEditALabel = (key, newColor) => {
        const labelIndex = currentLabelList.findIndex((label) => label.key === key);
        if (labelIndex !== -1) {
            currentLabelList[labelIndex].color = newColor;
        }
    }
    const handleAddCurrentLabelList = (newLabel) => {
        setCurrentLabelList([...currentLabelList, newLabel]);
    }
    const handleDeleteCurrentLabelList = (key) => {
        setCurrentLabelList(currentLabelList.filter((label) => label.key !== key));
    }

    // due date
    const handleClickDueDate = () => {
        setIsDueDateClick(!isDueDateClick);
    }
    const handleEditDueDate = (newDueDate) => {
        setCurrentDueDate(newDueDate);
    }
    // edit task
    const handleEditTask = () => {
        setIsEditTask(!isEditTaskClick);
    };
    const handleChangeCurrentValue = (event) => {
        setCurrentValue(event.target.value);
    };
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    const handleDeleteTask = () => {
        other.handleDeleteTask(keyTask)
    };

    //convert seconds to time
    const  convertSecondstToTime = (totalSeconds) => {
        if(Number.isNaN(totalSeconds))
            return null
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);

        const hoursString = String(hours).padStart(2, '0');
        const minutesString = String(minutes).padStart(2, '0');
        return `${hoursString}:${minutesString}`;
    }
    useEffect( () => {
        console.log(currentDueDate);
    }, [currentDueDate])
    return (
        <div key={keyTask} className={styles.card_container} draggable onDragStart={other.onDragStart}>
            <div className={styles.task_label_list}>
                {
                    currentLabelList.map((label) => (<div key={label.key} className={styles.task_label} style={{ backgroundColor: `${label.color}` }}></div>))
                }
            </div>
            <div className={styles.card_container_wrapper}>
                <input type='checkbox' checked={isChecked} onChange={handleCheckboxChange} />
                <div className={styles.text_area_wrapper}>
                    <textarea type='text' onInput={(event) => { event.target.parentNode.dataset.replicatedValue = event.target.value }} value={currentValue} onChange={handleChangeCurrentValue} />
                </div>
                <div className={styles.card_container_icon}>
                    <div className={styles.card_container_icon_wrapper}>
                        <FaIcons.FaTrash className={styles.icon} size={15} onClick={handleDeleteTask} />
                        <FIIcons.FiEdit2 className={styles.icon} size={15} onClick={handleEditTask} />
                    </div>
                    {
                        isEditTaskClick && <TaskEditMenu labels={currentLabelList} dueDate={currentDueDate} handleAddCurrentLabelList={handleAddCurrentLabelList} handleDeleteCurrentLabelList={handleDeleteCurrentLabelList} handleEditALabel={handleEditALabel} handleEditDueDate={handleEditDueDate} />
                    }
                </div>
            </div>
            <div className={styles.due_date} onClick={handleClickDueDate}>
                <span>{currentDueDate.startDate!== undefined?currentDueDate.startDate:null}</span>
                <span>{currentDueDate.startTime !== undefined?convertSecondstToTime(currentDueDate.startTime):null}</span>
                <span>{currentDueDate.timeIntend !== undefined?`[${convertSecondstToTime(currentDueDate.timeIntend)}]`:null}</span>
            </div>
        </div>
    );
}

export default Task;