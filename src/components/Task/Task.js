import React, { useEffect } from 'react';
import styles from './Task.module.css';
import { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as FIIcons from 'react-icons/fi';
import TaskEditMenu from './task_edit_menu/TaskEditMenu';
import roomApi from '../../api/roomApi';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
const Task = props => {
    const { roomId, roomLabels, title, keyTask, isDone, dueDate, ...others } = props;
    const [isChecked, setIsChecked] = useState(isDone);
    const [currentValue, setCurrentValue] = useState(title);

    const [isEditTaskClick, setIsEditTask] = useState(false);
    const [isDueDateClick, setIsDueDateClick] = useState(false);

    const [currentLabelList, setCurrentLabelList] = useState([]);
    const [currentDueDate, setCurrentDueDate] = useState(dueDate);
    /**
     * Save task change
     */
    const [isChangedTask, setIsChangedTask] = useState(false);
    const handleSaveButtonClick = () => {
        const saveTask = async () => {
            const data = {
                is_done: isChecked,
                task_intend: currentDueDate.timeIntend,
                task_content: currentValue,
                task_start_date: currentDueDate.startDate,
                task_start_time: currentDueDate.startTime
            }
            const respone = await roomApi.updateTask(keyTask, data);
            if(!respone.status)
            {
                toast.error(respone.message);
            }
        }
        saveTask();
        setIsChangedTask(false);
    }

    useEffect( () => {
        roomApi.fetchLabelsOfTask(keyTask).then(
            response => {
                if(response.return_code === 200)
                {
                    setCurrentLabelList(response.data);
                }
                return response;
            }
        ).catch(
            err => toast.error(err)
        );
        // eslint-disable-next-line
    }, []);

    // label list
    const handleEditALabel = (key, newColor) => {
        const labelIndex = currentLabelList?.findIndex((label) => label.label_id === key);
        if (labelIndex !== -1) {
            currentLabelList[labelIndex].color = newColor;
        }
    }
    const handleAddCurrentLabelList = (newLabel) => {
        setCurrentLabelList([...currentLabelList, newLabel]);
    }
    const handleDeleteCurrentLabelList = (key) => {
        console.log(key, currentLabelList);
        setCurrentLabelList(currentLabelList?.filter((label) => label.label_id !== key));
    }

    // due date
    const handleClickDueDate = () => {
        setIsDueDateClick(!isDueDateClick);
    }
    const handleEditDueDate = (newDueDate) => {
        setIsChangedTask(true);
        setCurrentDueDate(newDueDate);
    }
    // edit task
    const handleEditTask = () => {
        setIsEditTask(!isEditTaskClick);
    };
    const handleChangeCurrentValue = (event) => {
        setIsChangedTask(true);
        setCurrentValue(event.target.value);
    };
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    const handleDeleteTask = () => {
        others.handleDeleteTask(keyTask)
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
    // if roomLabels is changed
    useEffect( () => {
        if(currentLabelList != null && roomLabels != null)
        {
            let intersection = [];
            for (let i = 0; i < currentLabelList.length; i++) {
                const found = roomLabels.find(function (element) {
                    return element.label_id === currentLabelList[i].label_id;
                });
                
                if (found) {
                intersection.push(currentLabelList[i]);
                }
            }
            setCurrentLabelList(intersection);
        }
        // eslint-disable-next-line
    }, [roomLabels])
    const isDefaultDueDate = () => currentDueDate?.timeIntend === 0 && currentDueDate?.startTime === 0 && currentDueDate?.startDate === '1970-01-01T00:00:00.000+00:00';
    useEffect( () => {
        if(currentDueDate !== null && currentDueDate !== undefined && !isDefaultDueDate())
        {
            const convertedDate = new Date(currentDueDate?.startDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
            currentDueDate.startDate = format(new Date(convertedDate), 'yyyy-MM-dd');
        }
        // eslint-disable-next-line
    }, [currentDueDate]);
    return (
        <div key={`${keyTask}`} className={styles.card_container}>
            <div className={styles.task_label_list}>
                {
                    currentLabelList?.map((label) => (<div key={label?.label_id} className={styles.task_label} style={{ backgroundColor: `${label?.color}` }}></div>))
                }
            </div>
            <div className={styles.card_container_wrapper}>
                <input type='checkbox' checked={isChecked} onChange={handleCheckboxChange} />
                <div className={styles.text_area_wrapper}>
                    <textarea type='text' onInput={(event) => { event.target.parentNode.dataset.replicatedValue = event.target.value }} placeholder={"New Task Content"} value={currentValue} onChange={handleChangeCurrentValue} />
                </div>
                <div className={styles.card_container_icon}>
                    <div className={styles.card_container_icon_wrapper}>
                        <FaIcons.FaTrash className={styles.icon_delete} size={15} onClick={handleDeleteTask} />
                        <FIIcons.FiEdit2 className={styles.icon} size={15} onClick={handleEditTask} />
                    </div>
                    {
                        isEditTaskClick && <TaskEditMenu
                        setCurrentLabelList={setCurrentLabelList}
                        taskId = {keyTask} 
                        roomLabels={roomLabels} 
                        setRoomLabels={others.setRoomLabels} 
                        roomId={roomId} 
                        labels={currentLabelList} 
                        setLabels={setCurrentLabelList}
                        dueDate={currentDueDate}
                        handleAddCurrentLabelList={handleAddCurrentLabelList} 
                        handleDeleteCurrentLabelList={handleDeleteCurrentLabelList} 
                        handleEditALabel={handleEditALabel} 
                        handleEditDueDate={handleEditDueDate} />
                    }
                </div>
            </div>
            <div className={styles.due_date} onClick={handleClickDueDate}>
                <span>{currentDueDate?.startDate!== undefined && !isDefaultDueDate()?new Date(currentDueDate?.startDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }):null}</span>
                <span>{currentDueDate?.startTime !== undefined && !isDefaultDueDate()?convertSecondstToTime(currentDueDate?.startTime):null}</span>
                <span>{currentDueDate?.timeIntend !== undefined && !isDefaultDueDate()?`[${convertSecondstToTime(currentDueDate?.timeIntend)}]`:null}</span>
            </div>
            {
                isChangedTask && <button onClick={handleSaveButtonClick}>Save</button>
            }
        </div>
    );
}

export default Task;