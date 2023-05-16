import React, { useEffect, useState } from 'react';
import styles from './TimerPersonal.module.css';
import * as BSIcons from 'react-icons/bs';
import * as VSCIcons from 'react-icons/vsc';

const TimerPersonal = props => {
    const labels = ['Focus', 'Break', 'Long Break'];
    const [timeLine, SetTimeLine] = useState({
        "focus": 1800,
        "shortBreak": 300,
        "longBreak": 900
    });
    const [loopTimes, SetLoopTimes] = useState(4);

    const [currentLabel, SetCurrentLabel] = useState(labels[0]);
    const [counterTimer, SetCounterTimer] = useState(1800);
    const [currentLoop, SetCurrentLoop] = useState(0);

    const [isRunning, SetIsRunning] = useState(false);


    const minutes = Math.floor(counterTimer / 60);
    const seconds = counterTimer % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    const handlePlayButtonClick = () => {
        SetIsRunning(!isRunning);
    }
    const handleRestart = () => {
        SetCounterTimer(3);
        SetCurrentLoop(0);
        SetCurrentLabel(labels[0]);
    }
    useEffect(() => {
        let interval = null;
        if (isRunning) {
            if (counterTimer === 0) {

                // console.log("counterTimer: " + counterTimer + ", currentLoop: " + currentLoop + ", currentLabel: " + currentLabel);

                if (currentLabel === labels[0])
                {
                    SetCurrentLabel(labels[1]);
                    SetCounterTimer(timeLine.shortBreak);
                }
                else if (currentLabel === labels[1]) {
                    if (currentLoop < loopTimes) {
                        SetCurrentLoop(currentLoop => currentLoop + 1);
                        SetCurrentLabel(labels[0])
                        SetCounterTimer(timeLine.focus);
                        console.log(currentLoop);
                    }
                    else {
                        SetCurrentLoop(0);
                        SetCurrentLabel(labels[2])
                        SetCounterTimer(timeLine.longBreak);
                    }
                }
                else if (currentLabel === labels[2]){
                    SetCurrentLoop(0);
                    SetCurrentLabel(labels[0])
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
    }, [isRunning, currentLoop, currentLabel, loopTimes, counterTimer, labels, timeLine]);

    return (
        <div className={styles.container}>
            <div className={styles.container_wrapper}>
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
        </div>
    );
}

export default TimerPersonal;