import React from "react";
import styles from './LabelManager.module.css';
import { useState } from "react";
import Label from "./label/Label";
import * as AIIcons from "react-icons/ai";

const LabelManager = props => {
    const {labels, ...other} = props;
    const [labelList, setLabelList] = useState([
        {key: 1, isSelected: false, color: "rgb(255, 0, 0)", title: "Must"},
        {key: 2, isSelected: false, color: "rgb(0, 255, 0)", title: "Should"},
        {key: 3, isSelected: false, color: "rgb(0, 0, 255)", title: "Could"},
        {key: 4, isSelected: false, color: "rgb(255, 255, 0)", title: "Won't"},
        {key: 5, isSelected: false, color: "rgb(255, 0, 255)", title: "Easy"},
        {key: 6, isSelected: false, color: "rgb(0, 255, 255)", title: "Medium"},
        {key: 7, isSelected: false, color: "rgb(255, 165, 0)", title: "Large"}
    ]);
    const [nextKey, setNextKey] = useState(labelList.length + 1);
    const handleLabelClick = () => other.handleLabelClick();

    const handleDeleteCurrentLabelList = (key) => other.handleDeleteCurrentLabelList(key);
    const handleDeleteLable = (key) => {
        setLabelList(labelList.filter( (label) => label.key !== key));
        handleDeleteCurrentLabelList(key);
    }
    const handleAddCurrentLabelList = (newLabel) => other.handleAddCurrentLabelList(newLabel);
    const handleAddLabel = () => {
        const newLabel = {key: nextKey, isSelected: true, color: "white", title: "new Label"}
        setNextKey(nextKey + 1);
        setLabelList([...labelList,newLabel]);
    }
    
    labels.forEach((currentLabel) =>{
        let currentLabelList = labelList.filter( (label) => label.key === currentLabel.key);
        currentLabelList.forEach(element => element.isSelected = true);
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
                        labelList?.map( (label) => (<Label key={label.key} keyLabel={label.key} isSelected={label.isSelected} color={label.color} title={label.title} handleDeleteLable={handleDeleteLable} handleAddLabel={handleAddLabel} handleAddCurrentLabelList={handleAddCurrentLabelList} handleDeleteCurrentLabelList={handleDeleteCurrentLabelList} handleEditALabel={other.handleEditALabel}/>))
                    }
                </div>
                <div className={styles.add_label_container}>
                    <button onClick={handleAddLabel}>Add Labels ...</button>
                </div>
            </div>
        </div>
    );
}

export default LabelManager;