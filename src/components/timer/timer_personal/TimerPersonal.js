import React, { useEffect, useState } from 'react';
import styles from './TimerPersonal.module.css';
import * as BSIcons from 'react-icons/bs';
import * as VSCIcons from 'react-icons/vsc';

const TimerPersonal = props => {
    const labels = ['Focus', 'Break', 'Long Break'];
    const {timeLine, ...others} = props;
    const [currentLabel, SetCurrentLabel] = useState(labels[0]);
    const [counterTimer, SetCounterTimer] = useState(timeLine.pomodoro_time);
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
        SetCounterTimer(timeLine.pomodoro_time);
        SetCurrentLoop(1);
        SetCurrentLabel(labels[0]);
    }
    useEffect( () => {
        if(counterTimer === 3)
        {
            const audio = new Audio("https://lhmfrontend.s3.amazonaws.com/SoundEffect/timerAudio1.mp3");
            audio.play();
        }
    }, [counterTimer])
    useEffect( () => {
        if(currentLabel === 'Focus')
            SetCounterTimer(timeLine.pomodoro_time);
    }, [currentLabel, timeLine.pomodoro_time]);
    useEffect( () => {
        if(currentLabel === 'Short Break')
            SetCounterTimer(timeLine.short_break);
    }, [currentLabel, timeLine.short_break]);
    useEffect( () => {
        if(currentLabel === 'Long Break')
            SetCounterTimer(timeLine.long_break);
    }, [currentLabel, timeLine.long_break]);

    useEffect(() => {
        let interval = null;
        if (isRunning) {
            if (counterTimer === 0) {
                if (currentLabel === 'Focus') {
                    SetCurrentLabel('Short Break');
                    SetCounterTimer(timeLine.short_break);
                }
                else if (currentLabel === 'Short Break') {
                    if (currentLoop < timeLine.loop_times) {
                        SetCurrentLoop(currentLoop => currentLoop + 1);
                        SetCurrentLabel('Focus')
                        SetCounterTimer(timeLine.pomodoro_time);
                    }
                    else {
                        SetCurrentLabel('Long Break')
                        SetCounterTimer(timeLine.long_break);
                    }
                }
                else if (currentLabel === 'Long Break') {
                    SetCurrentLoop(1);
                    SetIsRunning(false);
                    SetCurrentLabel('Focus')
                    SetCounterTimer(timeLine.pomodoro_time);
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
                <h1>{currentLabel}</h1>
                <div className={styles.row_one_container}>
                    <div className={styles.counter_container}>
                        <div className={styles.counter_container_wrapper}>
                            <h1>{formattedMinutes} : {formattedSeconds}</h1>
                        </div>
                    </div>
                    <div className={styles.buttons_container}>
                        {
                            !isRunning ? <BSIcons.BsPlayCircle onClick={handlePlayButtonClick} size={'calc(1.5vw + 1.5vh)'} /> : <BSIcons.BsPauseCircle onClick={handlePlayButtonClick} size={'calc(1.5vw + 1.5vh)'}  />
                        }
                        <VSCIcons.VscDebugRestart onClick={handleRestart} size={'calc(1.5vw + 1.5vh)'} />
                    </div>
                </div>
                
                <div className={styles.row_two_container}>
                    <h2>{currentLoop}/{timeLine.loop_times}</h2>
                </div>
            </div>
        </div>
    );
}

export default TimerPersonal;