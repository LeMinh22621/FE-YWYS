import React, { useEffect, useState } from 'react';
import Task from '../Task/Task';
import styles from './TaskList.module.css';
import TaskListHeader from './task_list_header/TaskListHeader';

const TaskList = props => {
    const [isActive, setIsActive] = useState(false);
    const [currentTaskList, setCurrentTaskList] = useState(props.tasks);
    const [nextKey, setNextKey] = useState(props.tasks.length);

    const handleDeleteTask = (key) => {
        setCurrentTaskList(currentTaskList.filter( (task) => task.key !== key));
        // console.log(currentTaskList);
    }
    useEffect( () => {
        // console.log(currentTaskList);
    },[currentTaskList]);
    const handleDeleteTaskList = () =>{
        props.handleDeleteTaskList(props.keyTaskList);
    }

    const handleAddTask = () => {
        const newTask = { key: nextKey, title: "new title", isDone: false, handleDeleteTask:{handleDeleteTask} };
        setCurrentTaskList((currentTaskList) => [...currentTaskList, newTask]);
        setNextKey(nextKey => nextKey + 1);
    }

    const onMouseDown = () => {
        setIsActive(true);
    };
    const onMouseUp = () => {
        setIsActive(false);
    };

    return (
        <div key={props.keyTaskList} onMouseDown={onMouseDown} onMouseUp={onMouseUp} className={isActive ? `${styles.list_container} ${styles.is_grabbing}` : `${styles.list_container}`}>
            <div className={styles.list_container_wrapper}>
               <TaskListHeader key={props.keyTaskList} title={props.section_title} handleAddTask={handleAddTask} handleDeleteTaskList={handleDeleteTaskList}/>
                {
                    currentTaskList?.map((task) => (<Task key={task.key} keyTask={task.key} title={task.title} isDone={task.isDone} handleDeleteTask={handleDeleteTask}/> ))
                }
            </div>
        </div>
    );
}

export default TaskList;