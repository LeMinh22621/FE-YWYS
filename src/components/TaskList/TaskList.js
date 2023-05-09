import React, { useEffect, useState } from 'react';
import Task from '../Task/Task';
import styles from './TaskList.module.css';
import * as FaIcons from 'react-icons/fa';

const TaskList = props => {
    const [isActive, setIsActive] = useState(false);
    const [currentTaskList, setCurrentTaskList] = useState(null);
    const [nextKey, setNextKey] = useState(props.taskList.length); // start with key length for new task lists

    useEffect(() => setCurrentTaskList(props.taskList));

    const onAddTask = props.addTask;

    const handleAddTask = () => 
    {
        const newTask = {key: nextKey, title: "new title", percent: '0'};
        // setCurrentTaskList((currentTaskList) => [...currentTaskList, newTask]);
        onAddTask(currentTaskList, newTask);
        setNextKey(nextKey + 1);
        console.log(currentTaskList.length);
    }

    const onMouseDown = () => {
        setIsActive(true);
    };
    const onMouseUp = () => {
        setIsActive(false);
    };

    return (
        <section onMouseDown={onMouseDown} onMouseUp={onMouseUp} className={isActive ? `${styles.list} ${styles.is_grabbing}`: `${styles.list}` }>
            <div className={styles.task_list_header}>
                <header>{props.section_title}</header>
                <FaIcons.FaPlusCircle className={styles.plus_icon} onClick={handleAddTask}/>
            </div>
                {
                    currentTaskList?.map((task) => (<Task key={task?.key} title={task?.title} percent={task?.percent} />))
                }
        </section>
    );
}

export default TaskList;