import React from 'react';
import './Task.css';
const Task = props => 
{
    return (
        <div className="card">
            <header>{props.title}</header>
            <div className="detail">{props.percent}</div>
        </div>
    );
}

export default Task;