import styles from "./TimerHeader.module.css";
import * as AIIcons from 'react-icons/ai'
const TimerHeader = props => {
    const handleDropdownSelection = (event) =>{
        props.handleDropdownSelection(event.target.value);
    }
    const handleSettingClick = () => {
        props.handleSettingClick();
    }
    return (
        <div className={styles.header_container}>
            <div className={styles.header_container_wrapper}>
                <select onClick={handleDropdownSelection} className={styles.dropdown_container}>
                    <option value={"Personal"}>Personal</option>
                    <option value={"Group"}>Group</option>
                </select>
                <AIIcons.AiFillSetting onClick={handleSettingClick} className={styles.setting_icon} size={25}/>
            </div>
        </div>
    );
}

export default TimerHeader;