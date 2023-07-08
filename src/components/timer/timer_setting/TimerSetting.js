import React from "react";
import styles from "./TimerSetting.module.css";
import { useState } from "react";
import { useEffect } from "react";

const TimerSetting = props => {
    const {currentDropdownValue, timeLine, ...others} = props;
    console.log(timeLine);
    const currentTimeLine = currentDropdownValue === "Personal"?{
        pomodoro_time: timeLine.pomodoro_time,
        short_break: timeLine.short_break,
        long_break:  timeLine.long_break,
        loop_times: timeLine.loop_times 
    }:{
        pomodoro_time: timeLine.gr_pomodoro_time,
        short_break: timeLine.gr_short_break,
        long_break:  timeLine.gr_long_break,
        loop_times: timeLine.gr_loop_times 
    };
    const [focusTime, SetFocusTime] = useState(currentTimeLine.pomodoro_time);
    const [shortBreakTime, SetShortBreakTime] = useState(currentTimeLine.short_break);
    const [longBreakTime, SetLongBreakTime] = useState(currentTimeLine.long_break);
    const [loopTimes, SetLoopTimes] = useState(currentTimeLine.loop_times);

    const handleChange = (event, setFunc) => {
        let value = parseInt(event.target.value);
        console.log(value);
        if(value <= 0)
            value = 0;
        setFunc(value);
    }

    useEffect(() => {
        if(currentDropdownValue === "Personal")
            others.setTimeLine({
                timer_id: timeLine.timer_id,
                pomodoro_time: focusTime,
                short_break: shortBreakTime,
                long_break: longBreakTime,
                loop_times: loopTimes,
                gr_loop_times: timeLine.gr_loop_times,
                gr_short_break: timeLine.gr_short_break,
                gr_long_break: timeLine.gr_long_break,
                gr_pomodoro_time: timeLine.gr_pomodoro_time
            });
            // eslint-disable-next-line
        else
            others.setTimeLine({
                timer_id: timeLine.timer_id,
                pomodoro_time: timeLine.pomodoro_time,
                short_break: timeLine.short_break,
                long_break: timeLine.long_break,
                loop_times: timeLine.loop_times,
                gr_loop_times: loopTimes,
                gr_short_break: shortBreakTime,
                gr_long_break: longBreakTime,
                gr_pomodoro_time: focusTime
            });
            // eslint-disable-next-line
    }, [focusTime,shortBreakTime,longBreakTime,loopTimes])

    return (
        <div className={styles.setting_container}>
            <div className={styles.setting_container_wrapper}>
                <div className={styles.setting_time_line_container}>
                    <div className={styles.an_edit}>
                        <h3>Pomodoro</h3>
                        <input value={focusTime} onChange={(event) => handleChange(event, SetFocusTime)} type="number"></input>
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