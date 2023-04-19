import React from 'react';
import './Home.css'
import TaskList from '../../components/TaskList/TaskList';

function Home() {
  return (
    <>
      <header class="block" >
        <div class="profile-menu">
          <p>Le Hong Minh </p>
          <div class="profile-picture small-profile-picture">
            <img width="40px" alt="Le Hong Minh" src="http://upload.wikimedia.org/wikipedia/commons/e/e1/Anne_Hathaway_Face.jpg" />
          </div>
        </div>
      </header>
      <div className='my-list'>
        <TaskList section_title='To do' />
        <TaskList section_title='Doing' />
        <TaskList section_title='Done' />
      </div>

    </>
  );
}

export default Home;