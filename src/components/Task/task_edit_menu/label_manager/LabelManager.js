import React from "react";
import styles from './LabelManager.module.css';
import { useState } from "react";
import Label from "./label/Label";
import * as AIIcons from "react-icons/ai";
import * as RIIcons from "react-icons/ri";

const LabelManager = props => {
    
    const [labelList, setLabelList] = useState([
        {key: 0, isSelected: true, color: "green", title: "Must"},
        {key: 1, isSelected: false, color: "yellow", title: "Should"},
        {key: 2, isSelected: false, color: "orange", title: "Could"},
        {key: 3, isSelected: false, color: "red", title: "Won't"},
        {key: 4, isSelected: false, color: "greenyellow", title: "Easy"},
        {key: 5, isSelected: false, color: "blue", title: "Medium"},
        {key: 6, isSelected: false, color: "purple", title: "Large"}
    ]);
    const [nextKey, setNextKey] = useState(labelList.length);

    const handleLabelClick = () => props.handleLabelClick();
    const handleDeleteLable = (key) => {
        setLabelList(labelList.filter( (label) => label.key !== key));
    }
    const handleAddLable = () => {
        const newLabel = {key: nextKey, isSelected: true, color: "white", title: "new Label"}
        setNextKey(nextKey + 1);
        setLabelList([...labelList,newLabel]);
    }
    return (
        <div className={styles.label_manager_container}>
            <div className={styles.label_manager_container_wrapper}>
                <div className={styles.header_container}>
                    <h1>Labels</h1>
                    <AIIcons.AiOutlineCloseCircle size={25} className={styles.close_icon} onClick={handleLabelClick}/>
                </div>
                <div className={styles.label_list}>
                    {
                        labelList?.map( (label) => (<Label key={label.key} keyLabel={label.key} isSelected={label.isSelected} color={label.color} title={label.title} handleDeleteLable={handleDeleteLable}/>))
                    }
                </div>
                <div className={styles.add_label_container}>
                    <button onClick={handleAddLable}>Add Labels ...</button>
                </div>
            </div>
        </div>
    );
}

export default LabelManager;