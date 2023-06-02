import React, { useEffect } from "react";
import styles from './Label.module.css';
import { useState } from "react";
import * as FaIcons from 'react-icons/fa';
import ChangeColorMenu from "./change_color_menu/ChangeColorMenu";

const Label = props => {
    const {keyLabel, isSelected, color, title, ...other} = props;
    const [currentSelected, setCurrentSelected] = useState(isSelected);
    const [currentTitle, setCurrentTitle] = useState(title);
    const [currentColor, setCurrentColor] = useState(color);
    const [isChangeColorClick, setIsChangeColorClick] = useState(false);

    const handleChangeColor = (color) => {
        setCurrentColor(color);
        other.handleEditALabel(keyLabel, color);
    }
    const handleChangeColorButtonClick = () => {
        setIsChangeColorClick(!isChangeColorClick);
    }
    const handleSelect = () =>{
        setCurrentSelected(!currentSelected);
    }
    const handleTitleChange = (event) =>{
        setCurrentTitle(event.target.value);
    }
    const handleDeleteLable = () => {
        other.handleDeleteLable(keyLabel);
    }
    useEffect( () => {
        currentSelected?other.handleAddCurrentLabelList({key:keyLabel, color:`${currentColor}`}):other.handleDeleteCurrentLabelList(keyLabel);
    }, [currentSelected]);
    return (
        <div key={keyLabel} className={styles.label_container}>
            <div className={styles.label_container_wrapper}>
                <div className={styles.input_container}>
                    <input type='checkbox' checked={currentSelected} onChange={handleSelect}/>
                </div>
                <div className={styles.title_color_container} >
                    <div className={styles.title_color_container_wrapper} style={{backgroundColor: `${currentColor}`}}>
                        <div className={styles.color_container} style={{backgroundColor: `${currentColor}`}} onClick={handleChangeColorButtonClick}/>
                        <input type="text" onChange={handleTitleChange} value={currentTitle}/>
                    </div>
                    {
                        isChangeColorClick && <ChangeColorMenu keyLabel={keyLabel} handleChangeColor={handleChangeColor} handleEditALabel={other.handleEditALabel}/>
                    }
                </div>
                <button className={styles.delete_button}> <FaIcons.FaTrash className={styles.delete_icon} size={20} onClick={handleDeleteLable}/> </button>
            </div>
        </div>
    );
}

export default Label;