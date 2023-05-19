import React from "react";
import styles from "./Timer.module.css";
import { useState } from "react";
import TimerHeader from "./timer_header/TimerHeader";
import TimerPersonal from "./timer_personal/TimerPersonal";
import TimerSetting from "./timer_setting/TimerSetting";

const Timer = props => {
    const [currentDropdownValue, SetCurrentDropdownValue] = useState('Personal');
    const [isSettingClick, SetIsSettingClick] = useState(false);

    const [timeLinePersonal, SetTimeLinePersonal] = useState({
        "focus": 1800,
        "shortBreak": 300,
        "longBreak": 900,
        "loopTimes": 3
    });

    const [timeLineGroup, SetTimeLineGroup] = useState({
        "focus": 1200,
        "shortBreak": 300,
        "longBreak": 900,
        "loopTimes": 3
    });

    const handleDropdownSelection = (str) => {
        SetCurrentDropdownValue(str);
        SetIsSettingClick(false);
    }
    const handleSettingClick = () => {
        SetIsSettingClick(!isSettingClick);
    }

    return (
        <div className={styles.timer_container}>
            <div className={isSettingClick?styles.timer_container_wrapper_clicked:styles.timer_container_wrapper}>
                <TimerHeader handleSettingClick={handleSettingClick} handleDropdownSelection={handleDropdownSelection} />

                <div className={styles.body_container}>
                    <div className={styles.body_container_wrapper}>
                        {
                            currentDropdownValue === "Personal" ?

                                <TimerPersonal timeLine={timeLinePersonal} />
                                :
                                <TimerPersonal timeLine={timeLineGroup} />
                        }
                    </div>
                </div>

                {
                    isSettingClick &&
                    (
                        currentDropdownValue === "Personal" ?
                            <TimerSetting timeLine={timeLinePersonal} setTimeLine={SetTimeLinePersonal} />
                            :
                            <TimerSetting timeLine={timeLineGroup} setTimeLine={SetTimeLineGroup} />
                    )
                }
            </div>
        </div>
    );
}

export default Timer;