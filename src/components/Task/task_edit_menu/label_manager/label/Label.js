import React from "react";
import styles from './Label.module.css';
import { useState } from "react";
import * as FaIcons from 'react-icons/fa';
import ChangeColorMenu from "./change_color_menu/ChangeColorMenu";
import roomApi from "../../../../../api/roomApi";
import { toast } from "react-toastify";

const Label = props => {
    const {keyLabel, roomLabels, roomId, taskId, isSelected, color, title, ...other} = props;
    const [currentSelected, setCurrentSelected] = useState(isSelected);
    const [currentTitle, setCurrentTitle] = useState(title);
    const [currentColor, setCurrentColor] = useState(color);
    const [isChangeColorClick, setIsChangeColorClick] = useState(false);
    const [isEditLabel, setIsEditLabel] = useState(false);
    const handleChangeColor = (color) => {
        setCurrentColor(color);
        setIsEditLabel(true);
    }
    const handleChangeColorButtonClick = () => {
        setIsChangeColorClick(!isChangeColorClick);
    }
    const handleSelect = (e) =>{
        roomApi.changeIsDeletedInTaskLabel(taskId, keyLabel, currentSelected).then(
            response => {
                console.log(response);
                if(response.return_code === 200)
                {
                    setCurrentSelected(!currentSelected);
                    if(!currentSelected)
                    {
                        other.handleAddCurrentLabelList(response.data);
                    }
                    else{
                        other.handleDeleteCurrentLabelList(response.data.label_id);
                    }
                }
                else
                    toast.error(response.message);
                return response;
            }
        )
        .catch(err => toast.error(err));
    }
    const handleTitleChange = (event) =>{
        setCurrentTitle(event.target.value);
        setIsEditLabel(true);
    }
    const handleDeleteLable = () => {
        other.handleDeleteLable(keyLabel);
    }
    // handle save label
    const handleSavelabel = async () => {
        setIsEditLabel(false);
        const newLabelData = {
            'name': currentTitle,
            'color': currentColor
        }

        roomApi.updateLabel(keyLabel, newLabelData)
        .then(response => {
            console.log(response);
            if(response.return_code === 200)
            {
                other.handleEditALabel(response.data.label_id, response.data);
                const index = roomLabels.indexOf(roomLabels.filter(label => label.label_id === response.data.label_id)[0]);
                roomLabels[index].name = response.data.name;
                roomLabels[index].color = response.data.color;
                console.log(roomLabels[index]);
                other.setRoomLabels([...roomLabels])
            }
            else
                toast.error(response.message);
            return response;
        })
        .catch(err => toast.error(err));
    }
    return (
        <div key={keyLabel} className={styles.label_container}>
            <div className={styles.label_container_wrapper}>
                <div className={styles.input_container}>
                    <input type='checkbox' checked={currentSelected} onChange={handleSelect} value={currentSelected}/>
                </div>
                <div className={styles.title_color_container} >
                    <div className={styles.title_color_container_wrapper} style={{backgroundColor: `${currentColor}`}}>
                        <div className={styles.color_container} style={{backgroundColor: `${currentColor}`}} onClick={handleChangeColorButtonClick}/>
                        <input type="text" onChange={handleTitleChange} value={currentTitle}/>
                    </div>
                    {
                        isChangeColorClick && <ChangeColorMenu 
                            keyLabel={keyLabel} 
                            handleChangeColor={handleChangeColor} 
                            handleEditALabel={other.handleEditALabel}/>
                    }
                </div>
                <button className={styles.delete_button}> <FaIcons.FaTrash className={styles.delete_icon} size={20} onClick={handleDeleteLable}/> </button>
            </div>
            {
                isEditLabel && <button onClick={handleSavelabel}>Save</button>
            }
        </div>
    );
}

export default Label;