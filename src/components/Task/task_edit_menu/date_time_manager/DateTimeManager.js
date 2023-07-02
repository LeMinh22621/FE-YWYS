import React, { useEffect } from "react";
import styles from "./DateTimeManager.module.css";
import { useState } from "react";

const DateTimeManager = props => {
    const {dueDate, ...other} = props;
    
    const [startDate, setStartDate] = useState(dueDate.startDate);
    const [startTime, setStartTime] = useState(dueDate.startTime);
    const [timeIntend, setTimeIntend] = useState(dueDate.timeIntend);
    
    const [endTime, setEndTime] = useState(startTime + timeIntend);
    
    const handleChangeStartDate = (event) =>{
        setStartDate(event.target.value);
    }

    const handleChangeStartTime = (event) =>{
        const [hours, minutes] = event.target.value.split(":");
        const totalTime = parseInt(hours)*60*60 + parseInt(minutes)*60;
        setStartTime(totalTime);
        setEndTime(totalTime + timeIntend);
    }
    const convertSecondstToTime = (totalSeconds) => {
        let hours = Math.floor(totalSeconds / 3600) % 24;
        const minutes = Math.floor((totalSeconds % 3600) / 60);

        const hoursString = String(hours).padStart(2, '0');
        const minutesString = String(minutes).padStart(2, '0');

        return `${hoursString}:${minutesString}`;
    }
    const handleChangeTimeIntend = (event) =>{
        try{
            const timeIntendValue = parseInt(event.target.value);
            setTimeIntend(timeIntendValue);
            setEndTime(startTime + timeIntendValue);
        }
        catch(err)
        {
            console.log(err);
        }
    }
    useEffect( () => {
        other.handleEditDueDate({startDate: startDate, startTime: startTime, timeIntend: timeIntend});
        // eslint-disable-next-line
    }, [startDate, startTime, timeIntend])
    return (
        <div className={styles.date_time_manager_container}>
            <div className={styles.date_time_manager_container_wrapper}>
                <div className={styles.row}>
                    <span>Date</span>
                    <input type="date" value={startDate} onChange={handleChangeStartDate}/>
                </div>
                <div className={styles.row}>
                    <span>Start Time</span>
                    <input type="time" value={ convertSecondstToTime(startTime)} onChange={handleChangeStartTime}/>
                </div>
                <div className={styles.row}>
                    <span>Estimate Time</span>
                    <select value={timeIntend} onChange={handleChangeTimeIntend}>
                        <option value={0}>None</option>
                        <option value={300}>5m</option>
                        <option value={600}>10m</option>
                        <option value={900}>15m</option>
                        <option value={1200}>20m</option>
                        <option value={1800}>30m</option>
                        <option value={2700}>45m</option>
                        <option value={3600}>1h</option>
                        <option value={5400}>1h 30m</option>
                        <option value={7200}>2h</option>
                        <option value={9000}>2h 30m</option>
                        <option value={10800}>3h</option>
                        <option value={12600}>3h 30m</option>
                        <option value={14400}>4h</option>
                    </select>
                </div>
                <div className={styles.row}>
                    <span>End Time</span>
                    <input type="time" value={ convertSecondstToTime(endTime)} disabled readOnly contentEditable={false}/>
                </div>
            </div>
        </div>
    );
}
export default DateTimeManager;