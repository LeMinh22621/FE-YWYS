import React from "react";
import styles from "./Timer.module.css";
import { useState } from "react";
import TimerHeader from "./timer_header/TimerHeader";
import TimerPersonal from "./timer_personal/TimerPersonal";

const Timer = props => {
    const [currentDropdownValue, SetCurrentDropdownValue] = useState('Personal');

    const handleDropdownSelection = (str) => {
        SetCurrentDropdownValue(str);
    }

    return (
        <div className={styles.timer_container}>
            <div className={styles.timer_container_wrapper}>
                <TimerHeader handleDropdownSelection={handleDropdownSelection} />

                <div className={styles.body_container}>
                    <div className={styles.body_container_wrapper}>
                        {
                            currentDropdownValue === "Personal" ?

                                <TimerPersonal />
                                :
                                <>
                                    Group
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Timer;