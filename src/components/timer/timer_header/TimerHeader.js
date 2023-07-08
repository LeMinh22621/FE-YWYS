import { useState } from "react";
import styles from "./TimerHeader.module.css";
import * as AIIcons from 'react-icons/ai'
const TimerHeader = props => {
    const {isDisableSetting, currentDropdownValue, ...others} = props;
    const handleDropdownSelection = (event) =>{
        props.SetCurrentDropdownValue(event.target.value);
    }
    const handleSettingClick = () => {
        if(!isDisableSetting)
            props.handleSettingClick();
    }
    return (
        <div className={styles.header_container}>
            <div className={styles.header_container_wrapper}>
                <select value={currentDropdownValue} onChange={handleDropdownSelection} className={styles.dropdown_container}>
                    <option value={"Personal"}>Personal</option>
                    <option value={"Group"}>Group</option>
                </select>
                <AIIcons.AiFillSetting onClick={handleSettingClick} className={!isDisableSetting?styles.setting_icon:styles.setting_icon_disable} size={25}/>
            </div>
        </div>
    );
}

export default TimerHeader;