import React from "react";
import styles from "./TimerSetting.module.css";
import { useState } from "react";
import { useEffect } from "react";

const TimerSetting = props => {
    const [focusTime, SetFocusTime] = useState(props.timeLine.focus);
    const [shortBreakTime, SetShortBreakTime] = useState(props.timeLine.shortBreak);
    const [longBreakTime, SetLongBreakTime] = useState(props.timeLine.longBreak);
    const [loopTimes, SetLoopTimes] = useState(props.timeLine.loopTimes);

    
    const handleFocusTimeChange = (event, setFunc) => {
        let value = parseInt(event.target.value);
        if(value <= 0)
            value = 0;
        setFunc(value);
    }

    useEffect(() => {
        const handleTimeLine = (newTimeLine) => {
            props.setTimeLine(newTimeLine);
        }
        handleTimeLine(
            {
                "focus": focusTime,
                "shortBreak": shortBreakTime,
                "longBreak": longBreakTime,
                "loopTimes": loopTimes
            }
        )
    }, [focusTime,shortBreakTime,longBreakTime,loopTimes, props])

    return (
        <div className={styles.setting_container}>
            <div className={styles.setting_container_wrapper}>
                <div className={styles.setting_time_line_container}>
                    <div className={styles.an_edit}>
                        <h3>Pomodoro</h3>
                        <input value={focusTime} onChange={(event) => handleFocusTimeChange(event, SetFocusTime)} type="number" ></input>
                    </div>
                    <div className={styles.an_edit}>
                        <h3>Short Break</h3>
                        <input value={shortBreakTime} onChange={(event) => handleFocusTimeChange(event, SetShortBreakTime)} type="number"></input>
                    </div>
                    <div className={styles.an_edit}>
                        <h3>Long Break</h3>
                        <input value={longBreakTime} onChange={(event) => handleFocusTimeChange(event, SetLongBreakTime)} type="number"></input>
                    </div>
                </div>
                <div className={styles.an_edit}>
                    <h3>Pomodoro Loop Times</h3>
                    <input onChange={(event) => handleFocusTimeChange(event, SetLoopTimes)} value={loopTimes} type="number"></input>
                </div>
            </div>
        </div>
    );
}

export default TimerSetting;