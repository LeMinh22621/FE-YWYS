import React, { useEffect, useState } from 'react';
import styles from './TimerPersonal.module.css';
import * as BSIcons from 'react-icons/bs';
import * as VSCIcons from 'react-icons/vsc';

const TimerPersonal = props => {
    const [isRunning, SetIsRunning] = useState(false);

    const [counterTimer, SetCounterTimer] = useState(1743);

    const minutes = Math.floor(counterTimer / 60);
    const seconds = counterTimer % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    const handlePlayButtonClick = () => {
        SetIsRunning(!isRunning);
    }
    const handleRestart = () => {
        SetCounterTimer(1743);
    }
    useEffect(() => {
        let interval = null;
        if (isRunning) {
            interval = setInterval(() => {
                SetCounterTimer(prevTime => prevTime - 1);
            }, 1000);
        }
        else{
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    return (
        <div className={styles.container}>
            <div className={styles.container_wrapper}>
                <div className={styles.counter_container}>
                    <div className={styles.counter_container_wrapper}>
                        <h1>{formattedMinutes} : {formattedSeconds}</h1>
                    </div>
                </div>
                <div className={styles.buttons_container}>
                    {
                        !isRunning ? <BSIcons.BsPlayCircle onClick={handlePlayButtonClick} size={30} /> : <BSIcons.BsPauseCircle onClick={handlePlayButtonClick} size={30} />
                    }
                    <VSCIcons.VscDebugRestart onClick={handleRestart} size={30} />
                </div>
            </div>
        </div>
    );
}

export default TimerPersonal;