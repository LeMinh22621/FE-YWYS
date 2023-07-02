import React, { useEffect } from "react";
import styles from './LabelManager.module.css';
import { useState } from "react";
import Label from "./label/Label";
import * as AIIcons from "react-icons/ai";
import roomApi from "../../../../api/roomApi";
import { toast } from "react-toastify";

const LabelManager = props => {
    const { roomId, labels, ...other} = props;

    const [labelList, setLabelList] = useState([]);

    useEffect( () => {
        const fetchLabelListByRoomId = async () =>
        {
            try{
                const respone = await roomApi.getLabelListByRoomId(roomId);
                
                if(respone.status)
                {
                    setLabelList(respone.data);
                }
                else{
                    toast.error(respone.message);
                }
            }
            catch(err)
            {
                toast.error(err);
            }
        }
        
        fetchLabelListByRoomId(roomId);
        // eslint-disable-next-line
    },[]);

    const [nextKey, setNextKey] = useState(labelList.length + 1);
    const handleLabelClick = () => other.handleLabelClick();

    const handleDeleteCurrentLabelList = (key) => other.handleDeleteCurrentLabelList(key);
    const handleDeleteLable = (key) => {
        setLabelList(labelList.filter( (label) => label.key !== key));
        handleDeleteCurrentLabelList(key);
    }
    const handleAddCurrentLabelList = (newLabel) => other.handleAddCurrentLabelList(newLabel);
    const handleAddLabel = () => {
        const newLabel = {key: nextKey, isSelected: true, color: "white", name: "new Label"}
        setNextKey(nextKey + 1);
        setLabelList([...labelList,newLabel]);
    }
    
    labels?.forEach((currentLabel) =>{
        // setLabelList([...labelList.map((label) =>{
        //     if(label.label_id === currentLabel.label_id && label.isSelected === false)
        //         return {...label, isSelected: true}
        //     else 
        //         return {...label, isSelected: false}
        // })]);
        let currentLabelList = labelList.filter( (label) => label.label_id === currentLabel.label_id);
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
                        labelList?.map( (label) => (<Label key={label.label_id} keyLabel={label.label_id} isSelected={label.isSelected} color={label.color} title={label.name} handleDeleteLable={handleDeleteLable} handleAddLabel={handleAddLabel} handleAddCurrentLabelList={handleAddCurrentLabelList} handleDeleteCurrentLabelList={handleDeleteCurrentLabelList} handleEditALabel={other.handleEditALabel}/>))
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