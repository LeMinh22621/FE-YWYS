import React from "react";
import styles from './LabelManager.module.css';
import Label from "./label/Label";
import * as AIIcons from "react-icons/ai";
import roomApi from "../../../../api/roomApi";
import { toast } from "react-toastify";

const LabelManager = props => {
    const { roomId, roomLabels, taskId, labels, ...other} = props;
    const handleLabelClick = () => other.handleLabelClick();

    const handleDeleteLable = (key) => {
        roomApi.deleteLabel(key).then(
            response => {
                console.log(response);
                if(response.status)
                {
                    other.setRoomLabels(roomLabels.filter(label => label.label_id !== key));
                    other.handleDeleteCurrentLabelList(key);
                }
                return response;
            }
        ).catch(err => toast.error(err))
    }
    const handleAddLabel = () => {
        const newLabel = {color: "white", name: "new Label"}
        const data = {
            "room_id": roomId,
            ...newLabel
        }
        roomApi.createLabel(taskId, data).then(
            response => {
                console.log(response);
                if(response.status)
                {
                    other.setRoomLabels([...roomLabels,response.data]);
                    other.handleAddCurrentLabelList(response.data)
                }
                else
                    toast.error(response.message);
                return response;
            }
        ).catch(err => toast.error(err));
        
    }

    labels?.forEach((currentLabel) =>{
        let currentLabelList = roomLabels.filter( (label) => label.label_id === currentLabel.label_id);
        currentLabelList.forEach( element => element.isSelected = true);
    });
    return (
        <div className={styles.label_manager_container}>
            <div className={styles.label_manager_container_wrapper}>
                <div className={styles.header_container}>
                    <h1>Labels</h1>
                    <AIIcons.AiOutlineCloseCircle size={25} className={styles.close_icon} onClick={handleLabelClick}/>
                </div>
                <div className={styles.label_list}>
                    {
                        roomLabels?.map( (label) => (<Label 
                            setCurrentLabelList={other.setCurrentLabelList}
                            key={label.label_id} taskId={taskId} 
                            keyLabel={label.label_id} 
                            isSelected={labels.filter(hasLabel => hasLabel.label_id === label.label_id).length !== 0}
                            color={label.color} 
                            title={label.name} 
                            handleDeleteLable={handleDeleteLable} 
                            handleAddLabel={handleAddLabel} 
                            handleAddCurrentLabelList={other.handleAddCurrentLabelList} 
                            handleDeleteCurrentLabelList={other.handleDeleteCurrentLabelList} 
                            handleEditALabel={other.handleEditALabel}/>
                        ))
                    }
                </div>
                <div className={styles.add_label_container}>
                    <button onClick={handleAddLabel}>Add Labels...</button>
                </div>
            </div>
        </div>
    );
}

export default LabelManager;