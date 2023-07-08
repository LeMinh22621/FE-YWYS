import React, { useEffect, useState } from "react";
import styles from './TaskManager.module.css';
import TaskList from '../TaskList/TaskList';
import * as FaIcons from "react-icons/fa";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import roomApi from "../../api/roomApi";
import { toast } from "react-toastify";


const TaskManager = props => {
  const {roomId, taskManagerData, displayTaskManager, zIndex, ...others} = props;
  const [curZIndex, setCurZIndex] = useState(zIndex.task);
  const [taskLists, setTaskLists] = useState(taskManagerData);
  useEffect( () => {
    setTaskLists(taskManagerData);
  }, [taskManagerData])

  const handleDeleteTaskList = (key) => {
    setTaskLists(taskLists?.filter((taskList) => taskList.task_manager_id !== key))
  }

  const handleAddTaskList = () => {
    const createTaskManager = async () =>{
      const response = await roomApi.createTaskManager({room_id: roomId, task_manager_title: 'New List'});
      if(response.status)
      {
        if(taskLists !== undefined && taskLists !== null)
          setTaskLists([...taskLists, response.data]);
        else
          setTaskLists([response.data]);
      }
      else
        toast.error(response.message);
    }
    createTaskManager();
  };
  /**
   * Drag drop motivational quote
   */
  const [position, setPosition] = useState({ left: 50, top: 50 });
  const [dragging, setDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [cursor, setCursor] = useState('grab');
  const handleMouseDown = (event) => {
      setDragging(true);
      setCursor("grabbing");
      setCurZIndex(curZIndex + 2);
      setStartPos({ x: event.clientX, y: event.clientY });
  };
  const handleMouseMove = (event) => {
      if (!dragging) return;

      const offsetX = event.clientX - startPos.x;
      const offsetY = event.clientY - startPos.y;

      setPosition((prevPosition) => ({
          left: position.left < 0?0:prevPosition.left + offsetX,
          top: position.top < 0?0:prevPosition.top + offsetY,
      }));

      setStartPos({ x: event.clientX, y: event.clientY });
  };
  
  useEffect( () => {
      setCurZIndex(zIndex.task);
  },[zIndex])

  const handleMouseUp = () => {
      setDragging(false);
      setCursor("grab");
      others.setZIndex({
          space: curZIndex,
          timer: curZIndex,
          task: curZIndex + 1,
          quote: curZIndex
      });
  };

  /**
   * handle select task list
   */
  const [currentTaskList, setCurrentTaskList] = useState(taskLists);
  const [currentDropDownTaskList, setCurrentDropDownTaskList] = useState(0);
  const handleSelectTaskList = (e) => {
    setCurrentDropDownTaskList(e.target.value);
  }

  useEffect( () => {
    if(taskLists !== null && taskLists !== undefined)
      currentDropDownTaskList === '0'?setCurrentTaskList(taskLists):setCurrentTaskList(taskLists.filter( taskList => `${taskList.task_manager_id}` === currentDropDownTaskList));
    // eslint-disable-next-line 
  }, [currentDropDownTaskList])

  /**
   * Drag drop task list
   */
  const handleDragTaskListEnd = (result) => {
    if (!result.destination) {
      return;
    }
    console.log(result);
    const items = Array.from(currentTaskList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
  
    // Update the state or perform any other necessary actions
    setTaskLists(items);
  };
  const handleSaveTaskListTitle = (taskListId, newTaskListTitle) =>{
    taskLists.filter(taskList => taskList.task_manager_id === taskListId)[0].task_manager_title = newTaskListTitle;
  }
  useEffect( () =>{
    setCurrentTaskList(taskLists);
  },[taskLists]);

  /**
   * Label List of this room
   */
  const [thisRoomLabels, setThisRoomLabels] = useState([]);
  useEffect( () => {
    const fetchAllRoomLabels = async () =>{
      const response = await roomApi.getLabelListByRoomId(roomId);
      if(response.status)
      {
        setThisRoomLabels(response.data);
      }
      else
        toast.error(response.message);
    }
    fetchAllRoomLabels();
    // eslint-disable-next-line
  }, []);
  return (
    <div className={styles.task_manager_container} style={{
      position: 'fixed',
      left: position.left + 'px',
      top: position.top + 'px',
      cursor: `${cursor}`,
      display: `${displayTaskManager}`,
      zIndex: `${curZIndex}`
    }}>
      <div className={styles.header_container}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}>
          <div className={styles.header_container_wrapper}>
              <select className={styles.dropdown_container} onChange={handleSelectTaskList}>
                  <option key={0} value={0}>All</option>
                  {
                    taskLists?.map( (taskList) => <option key={taskList?.task_manager_id} value={taskList?.task_manager_id}>{taskList?.task_manager_title}</option>)
                  }
              </select>
          </div>
      </div>
        <DragDropContext onDragEnd={handleDragTaskListEnd}>
          <Droppable droppableId="task_list_manager" direction="horizontal">
            {(provided) => (
              <div className={styles.task_manager_container_wrapper} {...provided.droppableProps} ref={provided.innerRef}>
                {currentTaskList?.map((taskList, listIndex) => (
                  <Draggable key={taskList.task_manager_id} draggableId={`${taskList.task_manager_id}`} index={listIndex}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={styles.draggable_task_list}
                      >
                        <TaskList
                          roomId={roomId}
                          roomLabels = {thisRoomLabels}
                          setRoomLabels = {setThisRoomLabels}
                          listIndex={listIndex}
                          key={taskList.task_manager_id}
                          keyTaskList={taskList.task_manager_id}
                          section_title={taskList.task_manager_title}
                          tasks={taskList.task_list}
                          handleDeleteTaskList={handleDeleteTaskList}
                          handleSaveTaskListTitle = {handleSaveTaskListTitle}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <button className={styles.add_task_list_button}>
                  <FaIcons.FaPlus className={styles.add_icon} onClick={handleAddTaskList} />
                </button>
              </div>
            )}
          </Droppable>
      </DragDropContext>
    </div>
  );
}

export default TaskManager;