import React, { useEffect, useState } from 'react';
import Task from '../Task/Task';
import styles from './TaskList.module.css';
import TaskListHeader from './task_list_header/TaskListHeader';

const TaskList = props => {
    const {listIndex, keyTaskList, section_title, tasks, ...other} = props;

    const [isActive, setIsActive] = useState(false);
    const [currentTaskList, setCurrentTaskList] = useState(tasks);
    const [nextKey, setNextKey] = useState(tasks.length);

    const handleDeleteTask = (key) => {
        setCurrentTaskList(currentTaskList.filter( (task) => task.key !== key));
        // console.log(currentTaskList);
    }
    useEffect( () => {
        // console.log(currentTaskList);
    },[currentTaskList]);
    const handleDeleteTaskList = () =>{
        other.handleDeleteTaskList(keyTaskList);
    }

    const handleAddTask = () => {
        const newTask = { key: nextKey, title: "new title", isDone: false, labels:[] };
        setCurrentTaskList((currentTaskList) => [...currentTaskList, newTask]);
        setNextKey(nextKey => nextKey + 1);
    }

    const onMouseDown = () => {
        setIsActive(true);
    };
    const onMouseUp = () => {
        setIsActive(false);
    };

    ///
    const handleDragStart = (event, task, listIndex) => {
        event.dataTransfer.setData('task', JSON.stringify(task));
        event.dataTransfer.setData('listIndex', listIndex);
    };
    return (
        <div key={keyTaskList} onMouseDown={onMouseDown} onMouseUp={onMouseUp} className={isActive ? `${styles.list_container} ${styles.is_grabbing}` : `${styles.list_container}`}>
            <div key={keyTaskList} onDragOver={other.onDragOver} onDrop={other.onDrop} className={styles.list_container_wrapper}>
               <TaskListHeader key={keyTaskList} title={props.section_title} handleAddTask={handleAddTask} handleDeleteTaskList={handleDeleteTaskList}/>
                {
                    currentTaskList?.map((task) => (<Task onDragStart={(event) => handleDragStart(event, task, listIndex)} key={task.key} keyTask={task.key} title={task.title} isDone={task.isDone} labels={task.labels} dueDate={task.dueDate} handleDeleteTask={handleDeleteTask}/> ))
                }
            </div>
        </div>
    );
}

export default TaskList;