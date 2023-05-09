import React from 'react';
import styles from './Task.module.css';
const Task = props => 
{
    return (
        <div className= {styles.card}>
            <header>{props.title}</header>
            <div className= {styles.detail}>{props.percent}</div>
        </div>
    );
}

export default Task;