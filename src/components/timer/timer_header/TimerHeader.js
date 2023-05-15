import styles from "./TimerHeader.module.css";

const TimerHeader = props => {
    const handleDropdownSelection = (event) =>{
        props.handleDropdownSelection(event.target.value);
    }
    return (
        <div className={styles.header_container}>
            <div className={styles.header_container_wrapper}>
                <select onClick={handleDropdownSelection} className={styles.dropdown_container}>
                    <option value={"Personal"}>Personal</option>
                    <option value={"Group"}>Group</option>
                </select>
            </div>
        </div>
    );
}

export default TimerHeader;