import React, { useEffect } from "react";
import styles from "./Timer.module.css";
import { useState } from "react";
import TimerHeader from "./timer_header/TimerHeader";
import TimerPersonal from "./timer_personal/TimerPersonal";
import TimerSetting from "./timer_setting/TimerSetting";

const Timer = props => {
    const {displayTimer, isYourRoom, timerData, zIndex, ...others} = props;
    const [curZIndex, setCurZIndex] = useState(zIndex.timer);
    const [currentDropdownValue, SetCurrentDropdownValue] = useState('Personal');
    const [isSettingClick, SetIsSettingClick] = useState(false);

    const handleSettingClick = () => {
        SetIsSettingClick(!isSettingClick);
    }
    // set timer for personal or group
    useEffect( () => {
        !isYourRoom?SetCurrentDropdownValue('Group'):SetCurrentDropdownValue('Personal');
    }, [isYourRoom]);
    // disable setting button when u are not the host user room
    const [isDisableSetting, setIsDisableSetting] = useState(false);

    useEffect( () => {
        console.log(isYourRoom, currentDropdownValue, !isYourRoom && currentDropdownValue === 'Group');
        setIsDisableSetting(!isYourRoom && currentDropdownValue === 'Group');
    }, [currentDropdownValue]);
    /**
     * Drag drop timer
     */
    const [position, setPosition] = useState({ left: 50, top: 50 });
    const [dragging, setDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [cursor, setCursor] = useState('grab');
    const handleMouseDown = (event) => {
        setDragging(true);
        setCursor("grabbing");
        setCurZIndex(curZIndex + 2);
        setStartPos({ x: event.clientX, y: event.clientY });
    };
    const handleMouseMove = (event) => {
        if (!dragging) return;

        const offsetX = event.clientX - startPos.x;
        const offsetY = event.clientY - startPos.y;

        setPosition((prevPosition) => ({
            left: prevPosition.left + offsetX,
            top: prevPosition.top + offsetY,
        }));

        setStartPos({ x: event.clientX, y: event.clientY });
    };

    const handleMouseUp = () => {
        setDragging(false);
        setCursor("grab");
        others.setZIndex({
            space: curZIndex,
            timer: curZIndex + 1,
            task: curZIndex,
            quote: curZIndex,
        });
    };
    useEffect( () => {
        setCurZIndex(zIndex.timer);
    },[zIndex])

    return (
        <div className={styles.timer_container} style={{
            position: 'fixed',
            left: position.left + 'px',
            top: position.top + 'px',
            cursor: `${cursor}`,
            display: `${displayTimer}`,
            zIndex: `${curZIndex}`
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}>
            <div className={isSettingClick?styles.timer_container_wrapper_clicked:styles.timer_container_wrapper}>
                <TimerHeader 
                isDisableSetting={isDisableSetting} 
                currentDropdownValue={currentDropdownValue} 
                handleSettingClick={handleSettingClick} 
                SetCurrentDropdownValue={SetCurrentDropdownValue} />

                <div className={styles.body_container}>
                    <div className={styles.body_container_wrapper}>
                        {
                            currentDropdownValue === "Personal" ?

                                <TimerPersonal currentDropdownValue={currentDropdownValue} timeLineData={timerData} />
                                :
                                <TimerPersonal currentDropdownValue={currentDropdownValue} timeLineData={timerData} />
                        }
                    </div>
                </div>
                {
                    isSettingClick &&
                    (
                        currentDropdownValue === "Personal" ?
                            <TimerSetting currentDropdownValue={currentDropdownValue} timeLine={timerData} setTimeLine={others.setTimerData}/>
                            :
                            <TimerSetting currentDropdownValue={currentDropdownValue} timeLine={timerData} setTimeLine={others.setTimerData}/>
                    )
                }
            </div>
        </div>
    );
}

export default Timer;