import React from 'react';
import './Task.css';
const Task = props => 
{
    return (
        <div class="card">
            <header>{props.title}</header>
            <div class="detail">{props.percent}</div>
        </div>
    );
}

export default Task;