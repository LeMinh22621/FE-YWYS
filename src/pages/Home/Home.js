import React, { useState } from 'react';
import './Home.css'
import TaskList from '../../components/TaskList/TaskList';
import * as FaIcons from 'react-icons/fa';

function Home() {

  const [taskLists, setTaskLists] = useState([
    { key: 0, title: 'To do' },
    { key: 1, title: 'Doing' },
    { key: 2, title: 'Done' },
  ]);

  const [nextKey, setNextKey] = useState(taskLists.length); // start with key 3 for new task lists

  const handleAddTaskList = () => {
    const newTaskList = { key: nextKey, title: 'New List' };
    setTaskLists([...taskLists, newTaskList]);
    setNextKey(nextKey + 1); // increment key counter for next task list
  };

  return (
    <>
      <header className="block" >
        <div className="profile-menu">
          <p>Le Hong Minh </p>
          <div className="profile-picture small-profile-picture">
            <img width="40px" alt="Le Hong Minh" src="http://upload.wikimedia.org/wikipedia/commons/e/e1/Anne_Hathaway_Face.jpg" />
          </div>
        </div>
      </header>
      <div className='my-list'>
        {taskLists.map((taskList) => (
          <TaskList key={taskList.key} section_title={taskList.title} />
        ))}
        <FaIcons.FaPlus onClick={handleAddTaskList} className='add-task-list'/>
      </div>
      
    </>
  );
}

export default Home;