import React, { useState } from "react";
import styles from './TaskManager.module.css';
import TaskList from '../TaskList/TaskList';
import * as FaIcons from "react-icons/fa";


const TaskManager = props => {

  const [todoList, setTodoList] = useState([
    { key: 1,
      title: "to do task 1",
      isDone: true,
      dueDate: {startDate: "2023-06-01", startTime: 37800, timeIntend: 3600},
      labels: [
          {key: 2, color: "rgb(0, 255, 0)"},
          {key: 3, color: "rgb(0, 0, 255)"}
      ]
  },
    { key: 2, title: "to do task 2", isDone: true, dueDate:{}, labels: []},
    { key: 3, title: "to do task 3", isDone: false, dueDate:{}, labels:[]},
    { key: 4, title: "to do task 4", isDone: false, dueDate:{}, labels:[] },
    { key: 5, title: "to do task 5", isDone: false, dueDate:{}, labels:[] },
    { key: 6, title: "to do task 6", isDone: false, dueDate:{}, labels:[] },
    { key: 7, title: "to do task 7", isDone: false, dueDate:{}, labels:[] }
  ]);
  const [doingList, setDoingList] = useState([
    { key: 8, title: "doing task 1", isDone: false, dueDate:{}, labels:[] },
    { key: 9, title: "doing task 2", isDone: false, dueDate:{}, labels:[] },
    { key: 10, title: "doing task 3", isDone: false, dueDate:{}, labels:[] },
    { key: 11, title: "doing task 4", isDone: false, dueDate:{}, labels:[] }
  ]);
  const [doneList, setDoneList] = useState([
    { key: 12, title: "done task 1", isDone: false, dueDate:{}, labels:[] },
    { key: 13, title: "done task 2", isDone: false, dueDate:{}, labels:[] },
    { key: 14, title: "done task 3", isDone: false, dueDate:{}, labels:[] },
    { key: 15, title: "done task 4", isDone: false, dueDate:{}, labels:[] }
  ]);

  const [taskLists, setTaskLists] = useState([
    { key: 1, title: 'To do', tasks: todoList },
    { key: 2, title: 'Doing', tasks: doingList },
    { key: 3, title: 'Done', tasks: doneList }
  ]);

  const [nextKey, setNextKey] = useState(taskLists.length+1);

  const handleDeleteTaskList = (key) => {
    setTaskLists(taskLists.filter((taskList) => taskList.key !== key))
    console.log(key);
  }

  const handleAddTaskList = () => {
    const newTaskList = { key: nextKey, title: 'New List', tasks: []};
    setTaskLists([...taskLists, newTaskList]);
    setNextKey(nextKey + 1);
  };

  /// drag and drop tag
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, listIndex) => {
    // event.preventDefault();
    const droppedTask = JSON.parse(event.dataTransfer.getData('task'));
    const sourceListIndex = parseInt(event.dataTransfer.getData('listIndex'));

    if (listIndex !== sourceListIndex) {
      // Remove task from the source list
      const sourceList = taskLists[sourceListIndex].tasks.filter((task) => task.key !== droppedTask.key);

      // Add task to the target list
      const targetList = [...taskLists[listIndex].tasks, droppedTask];

      // Update taskLists state
      const updatedTaskLists = [...taskLists];
      updatedTaskLists[sourceListIndex].tasks = sourceList;
      updatedTaskLists[listIndex].tasks = targetList;
      setTaskLists(updatedTaskLists);
    }
  };
  console.log(taskLists);
  // useEffect( () => {
  //   console.log(taskLists);
  // }, [taskLists])
  return (
    <div className={styles.task_manager_container}>
      <div className={styles.task_manager_container_wrapper}>
        {
          taskLists?.map((taskList, listIndex) => (<TaskList onDragOver={(event) => handleDragOver(event)} onDrop={(event) => handleDrop(event, listIndex)} listIndex={listIndex} key={taskList.key} keyTaskList={taskList.key} section_title={taskList.title} tasks={taskList.tasks} handleDeleteTaskList={handleDeleteTaskList} />))
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