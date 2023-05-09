import React from 'react';
import styles from './Home.module.css';
// import TaskList from '../../components/TaskList/TaskList';
// import * as FaIcons from 'react-icons/fa';
// import Navbar from '../../components/navbar/Navbar';

import Room from '../../components/room/Room';

function Home() {
  // const [todoList, setTodoList] = useState([
  //   {key: 0, title: "to do task 0", percent: '1/2'},
  //   {key: 1, title: "to do task 1", percent: '1/2'},
  //   {key: 2, title: "to do task 2", percent: '1/3'},
  //   {key: 3, title: "to do task 3", percent: '1/4'},
  //   {key: 4, title: "to do task 1", percent: '1/2'},
  //   {key: 5, title: "to do task 2", percent: '1/3'},
  //   {key: 6, title: "to do task 3", percent: '1/4'}
  // ]);
  // const [doingList, setDoingList] = useState([
  //   {key: 0, title: "doing task 0", percent: '1/2'},
  //   {key: 1, title: "doing task 1", percent: '1/5'},
  //   {key: 2, title: "doing task 2", percent: '1/6'},
  //   {key: 3, title: "doing task 3", percent: '1/7'}
  // ]);
  // const [doneList, setDoneList] = useState([
  //   {key: 0, title: "done task 0", percent: '1/2'},
  //   {key: 1, title: "done task 1", percent: '1/2'},
  //   {key: 2, title: "done task 2", percent: '1/3'},
  //   {key: 3, title: "done task 3", percent: '1/4'}
  // ]);

  // const addTask = (currentList, newTask) => {currentList = [...currentList, newTask]}

  // const [taskLists, setTaskLists] = useState([
  //   { key: 0, title: 'To do', tasks: todoList, addTask: addTask},
  //   { key: 1, title: 'Doing', tasks: doingList, addTask: addTask},
  //   { key: 2, title: 'Done', tasks: doneList, addTask: addTask},
  // ]);

  // const [nextKey, setNextKey] = useState(taskLists.length); // start with key 3 for new task lists

  // const handleAddTaskList = () => {
  //   const newTaskList = { key: nextKey, title: 'New List', tasks: [], addTask: addTask};
  //   setTaskLists([...taskLists, newTaskList]);
  //   setNextKey(nextKey + 1); // increment key counter for next task list
  // };

  return (
    <div className={styles.my_body_screen}>{/* have no */}
      {/* <Navbar />
      <div className={styles.main_container}>
        <div className={styles.my_list}>
          {
            taskLists.map((taskList) => (<TaskList key={taskList.key} section_title={taskList.title} taskList={taskList.tasks}/>))
          }
          <FaIcons.FaPlus onClick={handleAddTaskList} className={styles.add_task_list}/>
        </div>
      </div> */}

      <Room/>
    </div>
  );
}

export default Home;