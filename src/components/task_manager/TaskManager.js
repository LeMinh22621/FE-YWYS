import React, { useState } from "react";
import styles from './TaskManager.module.css';
import TaskList from '../TaskList/TaskList';
import * as FaIcons from "react-icons/fa";


const TaskManager = props => {

  const [todoList, setTodoList] = useState([
    { key: 0, title: "to do task 1", isDone: true },
    { key: 1, title: "to do task 2", isDone: true },
    { key: 2, title: "to do task 3", isDone: false },
    { key: 3, title: "to do task 4", isDone: false },
    { key: 4, title: "to do task 5", isDone: false },
    { key: 5, title: "to do task 6", isDone: false },
    { key: 6, title: "to do task 7", isDone: false }
  ]);
  const [doingList, setDoingList] = useState([
    { key: 0, title: "doing task 1", isDone: false },
    { key: 1, title: "doing task 2", isDone: false },
    { key: 2, title: "doing task 3", isDone: false },
    { key: 3, title: "doing task 4", isDone: false }
  ]);
  const [doneList, setDoneList] = useState([
    { key: 0, title: "done task 1", isDone: false },
    { key: 1, title: "done task 2", isDone: false },
    { key: 2, title: "done task 3", isDone: false },
    { key: 3, title: "done task 4", isDone: false }
  ]);

  const [taskLists, setTaskLists] = useState([
    { key: 0, title: 'To do', tasks: todoList },
    { key: 1, title: 'Doing', tasks: doingList },
    { key: 2, title: 'Done', tasks: doneList }
  ]);

  const [nextKey, setNextKey] = useState(taskLists.length);

  const handleDeleteTaskList = (key) => {
    setTaskLists(taskLists.filter((taskList) => taskList.key !== key))
    console.log(key);
  }

  const handleAddTaskList = () => {
    const newTaskList = { key: nextKey, title: 'New List', tasks: [] };
    setTaskLists([...taskLists, newTaskList]);
    setNextKey(nextKey + 1);
  };



  return (
    <div className={styles.task_manager_container}>
      <div className={styles.task_manager_container_wrapper}>
        {
          taskLists?.map((taskList) => (<TaskList keyTaskList={taskList.key} section_title={taskList.title} tasks={taskList.tasks} handleDeleteTaskList={handleDeleteTaskList} />))
        }
        <button
          className={styles.add_task_list_button}>
          <FaIcons.FaPlus className={styles.add_icon} onClick={handleAddTaskList} />
        </button>
      </div>
    </div>
  );
}

export default TaskManager;