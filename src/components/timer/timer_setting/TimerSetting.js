import React from "react";
import styles from "./TimerSetting.module.css";
import { useState } from "react";
import { useEffect } from "react";

const TimerSetting = props => {
    const {timeLine, ...others} = props;
    const [currentTimeLine, setCurrentTimeLine] = useState(timeLine);
    const [focusTime, SetFocusTime] = useState(currentTimeLine.pomodoro_time);
    const [shortBreakTime, SetShortBreakTime] = useState(currentTimeLine.short_break);
    const [longBreakTime, SetLongBreakTime] = useState(currentTimeLine.long_break);
    const [loopTimes, SetLoopTimes] = useState(currentTimeLine.loop_times);
    console.log(currentTimeLine);
    const handleChange = (event, setFunc) => {
        let value = parseInt(event.target.value);
        if(value <= 0)
            value = 0;
        setFunc(value);
    }

    useEffect(() => {
        others.setTimeLine(
        {
            "pomodoro_time": focusTime,
            "short_break": shortBreakTime,
            "long_break": longBreakTime,
            "loop_times": loopTimes
        });
        // eslint-disable-next-line
    }, [focusTime,shortBreakTime,longBreakTime,loopTimes])

    return (
        <div className={styles.setting_container}>
            <div className={styles.setting_container_wrapper}>
                <div className={styles.setting_time_line_container}>
                    <div className={styles.an_edit}>
                        <h3>Pomodoro</h3>
                        <input value={focusTime} onChange={(event) => handleChange(event, SetFocusTime)} type="number" ></input>
                    </div>
                    <div className={styles.an_edit}>
                        <h3>Short Break</h3>
                        <input value={shortBreakTime} onChange={(event) => handleChange(event, SetShortBreakTime)} type="number"></input>
                    </div>
                    <div className={styles.an_edit}>
                        <h3>Long Break</h3>
                        <input value={longBreakTime} onChange={(event) => handleChange(event, SetLongBreakTime)} type="number"></input>
                    </div>
                    <div className={styles.an_edit}>
                        <h3>Pomodoro Loop Times</h3>
                        <input onChange={(event) => handleChange(event, SetLoopTimes)} value={loopTimes} type="number"></input>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TimerSetting;