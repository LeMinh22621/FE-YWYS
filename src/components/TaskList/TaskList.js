import React, { useState } from 'react';
import Task from '../Task/Task';
import styles from './TaskList.module.css';
import TaskListHeader from './task_list_header/TaskListHeader';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import roomApi from '../../api/roomApi';
import { toast } from 'react-toastify';

const TaskList = props => {
    const { roomId, listIndex, keyTaskList, section_title, tasks, ...others } = props;

    const [isActive, setIsActive] = useState(false);
    const [currentTaskList, setCurrentTaskList] = useState(tasks);
    const [taskTitle, setTaskTitle] = useState(section_title);

    const handleDeleteTask = (key) => {
        roomApi.deleteTask(key)
            .then(response => {console.log(response); return response;})
            .then(response => {
                if(response.status)
                    setCurrentTaskList(currentTaskList.filter((task) => task.task_id !== key));
                else
                    toast.error(response.message);
            })
            .catch(err => {toast.error(err); });
    }
    const handleDeleteTaskList = () => {
        others.handleDeleteTaskList(keyTaskList);
    }

    const handleAddTask = () => {
        const addTaskForANewTaskList = async () => {
            const data = {
                task_manager_id: keyTaskList,
                task_start_time: 0,
                task_start_date: 0,
                task_content: '',
                task_intend: 0,
                is_done: false
            }
            const response = await roomApi.createTask(data);
            console.log(response);
            if(response.status)
            {
                if(currentTaskList !== null && currentTaskList !== undefined)
                    setCurrentTaskList((currentTaskList) => [...currentTaskList, response.data]);
                else
                    setCurrentTaskList([response.data]);
            }
            else{
                toast.error(response.message);
            }
        }

        addTaskForANewTaskList();
    }

    const onMouseDown = () => {
        setIsActive(true);
    };
    const onMouseUp = () => {
        setIsActive(false);
    };

    //
    const handleDragTaskEnd = (result) => {
        console.log(result);
        if (!result.destination) {
            return;
        }
        const items = Array.from(currentTaskList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        // Update the state or perform any other necessary actions
        setCurrentTaskList(items);
    };

    /**
     * handle change title
     */
    const handleChangeTitle = (newTitle) => {
        setTaskTitle(newTitle);
    }
    return (
        <div key={keyTaskList} className={styles.list_container}>
            <div key={keyTaskList} className={isActive ? styles.is_grabbing : styles.list_container_wrapper} onMouseUp={onMouseUp} onMouseDown={onMouseDown}>
                <TaskListHeader key={`${keyTaskList}.`} keyTaskList={`${keyTaskList}`} title={taskTitle} handleChangeTitle={handleChangeTitle} handleSaveTaskListTitle = {others.handleSaveTaskListTitle} handleAddTask={handleAddTask} handleDeleteTaskList={handleDeleteTaskList} />
                <DragDropContext key={keyTaskList} onDragEnd={handleDragTaskEnd}>
                    <Droppable key={keyTaskList} droppableId={`${keyTaskList}`} direction="vertical">
                        {
                            (provided) => (
                                <div key={keyTaskList} className={styles.list_of_task}  {...provided.droppableProps} ref={provided.innerRef}>
                                    {
                                        currentTaskList?.map((task, index) => {
                                            const dueDate = {
                                                timeIntend: task?.task_intend,
                                                startTime: task?.task_start_time,
                                                startDate: task?.task_start_date
                                            }
                                            return (
                                                <Draggable
                                                    key={task.task_id}
                                                    draggableId={`${task.task_id}`}
                                                    index={index}>
                                                    {
                                                        (provided) => (
                                                            <div
                                                                key={task.task_id}
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                className={styles.draggable_task}
                                                            >
                                                                <Task
                                                                    roomId={roomId}
                                                                    key={task.task_id}
                                                                    keyTask={task.task_id}
                                                                    title={task.task_content}
                                                                    isDone={task.is_done}
                                                                    labels={task.label_list}
                                                                    dueDate={dueDate}
                                                                    handleDeleteTask={handleDeleteTask}/>
                                                            </div>
                                                        )
                                                    }
                                                </Draggable>
                                            )
                                        })
                                    }                                
                                    {provided.placeholder}
                                </div>
                            )
                        }
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    );
}

export default TaskList;