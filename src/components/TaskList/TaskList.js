import React, { useState } from 'react';
import Task from '../Task/Task';
import './TaskList.css';
import * as FaIcons from 'react-icons/fa';

const TaskList = props => {
    const [isActive, setIsActive] = useState(false);

    const onMouseDown = () => {
        setIsActive(true);
    };
    const onMouseUp = () => {
        setIsActive(false);
    };
    return (
        <section onMouseDown={onMouseDown} onMouseUp={onMouseUp} className={isActive ? 'list is-grabbing' : 'list'}>
            <div className='task-list-header'>
                <header>{props.section_title}</header>
                <FaIcons.FaPlusCircle className='plus-icon' />
            </div>

            <Task title='Drag and Drop CSS' percent='1/2' />
            <Task title='Maybe something else Maybe something else Maybe something else ' percent='1/3' />
        </section>
    );
}

export default TaskList;