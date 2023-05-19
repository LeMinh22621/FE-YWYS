import React, { useEffect, useState } from 'react';
import styles from './TimerPersonal.module.css';
import * as BSIcons from 'react-icons/bs';
import * as VSCIcons from 'react-icons/vsc';

const TimerPersonal = props => {
    const labels = ['Focus', 'Break', 'Long Break'];
    const timeLine = props.timeLine;

    const [currentLabel, SetCurrentLabel] = useState(labels[0]);
    const [counterTimer, SetCounterTimer] = useState(timeLine.focus);
    const [currentLoop, SetCurrentLoop] = useState(1);

    const [isRunning, SetIsRunning] = useState(false);


    const minutes = Math.floor(counterTimer / 60);
    const seconds = counterTimer % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    const handlePlayButtonClick = () => {
        SetIsRunning(!isRunning);
    }
    const handleRestart = () => {
        SetCounterTimer(timeLine.focus);
        SetCurrentLoop(1);
        SetCurrentLabel(labels[0]);
    }
    useEffect( () => {
        if(currentLabel === 'Focus')
            SetCounterTimer(timeLine.focus);
    }, [currentLabel, timeLine.focus]);
    useEffect( () => {
        if(currentLabel === 'Short Break')
            SetCounterTimer(timeLine.shortBreak);
    }, [currentLabel, timeLine.shortBreak]);
    useEffect( () => {
        if(currentLabel === 'Long Break')
            SetCounterTimer(timeLine.longBreak);
    }, [currentLabel, timeLine.longBreak]);

    useEffect(() => {
        let interval = null;
        if (isRunning) {
            if (counterTimer === 0) {
                if (currentLabel === 'Focus') {
                    SetCurrentLabel('Short Break');
                    SetCounterTimer(timeLine.shortBreak);
                }
                else if (currentLabel === 'Short Break') {
                    if (currentLoop < timeLine.loopTimes) {
                        SetCurrentLoop(currentLoop => currentLoop + 1);
                        SetCurrentLabel('Focus')
                        SetCounterTimer(timeLine.focus);
                        console.log(currentLoop);
                    }
                    else {
                        SetCurrentLabel('Long Break')
                        SetCounterTimer(timeLine.longBreak);
                    }
                }
                else if (currentLabel === 'Long Break') {
                    SetCurrentLoop(1);
                    SetCurrentLabel('Focus')
                    SetCounterTimer(timeLine.focus);
                }
            }
            interval = setInterval(() => {
                SetCounterTimer(prevTime => prevTime - 1);
            }, 1000);
        }
        else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isRunning, currentLoop, currentLabel, counterTimer, timeLine]);

    return (
        <div className={styles.container}>
            <div className={styles.container_wrapper}>
                <div className={styles.row_one_container}>
                    <div className={styles.counter_container}>
                        <div className={styles.counter_container_wrapper}>
                            <h1>{formattedMinutes} : {formattedSeconds}</h1>
                        </div>
                    </div>
                    <h1>{currentLabel}</h1>
                    <div className={styles.buttons_container}>
                        {
                            !isRunning ? <BSIcons.BsPlayCircle onClick={handlePlayButtonClick} size={30} /> : <BSIcons.BsPauseCircle onClick={handlePlayButtonClick} size={30} />
                        }
                        <VSCIcons.VscDebugRestart onClick={handleRestart} size={30} />
                    </div>
                </div>
                <div className={styles.row_two_container}>
                    <h2>{currentLoop}/{timeLine.loopTimes}</h2>
                </div>
            </div>
        </div>
    );
}

export default TimerPersonal;