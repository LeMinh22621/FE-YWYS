import React from 'react';
import Task from '../Task/Task';
import './TaskList.css';
import * as FaIcons from 'react-icons/fa';

const TaskList = props => {
    return (
        <section class="list">
            <div class='task-list-header'>
                <header>{props.section_title}</header>
                <FaIcons.FaPlusCircle className='plus-icon'/>
            </div>
            
            <Task title='Drag and Drop CSS' percent='1/2' />
            <Task title='Maybe something else Maybe something else Maybe something else ' percent='1/3' />
        </section>
    );
}

export default TaskList;