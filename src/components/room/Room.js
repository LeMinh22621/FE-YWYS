import React, { useState } from "react";
import styles from './room.module.css';
import * as FaIcon from 'react-icons/fa';
import * as TFIIcon from 'react-icons/tfi';

import BackgroundMenu from "../background_menu/BackgroundMenu";
import MotivationalQuote from "../motivational_quote/MotivationalQuote";
import MotivationalQuoteDropdown from "../motivational_quote_dropdown/motivational_quote/MotivationalQuoteDropdown";
import roomApi from "../../api/roomApi";
import { useEffect } from "react";
import Timer from "../timer/Timer";
import TaskManager from "../task_manager/TaskManager";

const fetchData = async (SetMotivationalQuoteData, token) => {
    try {
        const respone = await roomApi.getRandomMotivationQuote({
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        SetMotivationalQuoteData(respone.data);
        return respone.data;
    }
    catch (err) {
        alert(err.message);
    }
}

const Room = props => {
    const [displayTimer, SetDisplayTimer] = useState("none");
    const [isImageIconOpen, SetIsImageIconOpen] = useState(false);
    const [isQuoteIconClicked, SetIsQuoteIconClicked] = useState(false);
    const [isHiddenQuote, SetIsHiddenQuote] = useState(true);
    const [isTimerClicked, SetIsTimerClicked] = useState(false);
    const [isTaskClicked, SetIsTaskClicked] = useState(false);
    const [motivationalQuoteData, SetMotivationalQuoteData] = useState({});

    const shuffleQuote = () => {
        const response = fetchData(SetMotivationalQuoteData, localStorage.getItem("jwtToken"));
        console.log(response);
    }
    const toggleTaskClick = () => {
        SetIsTaskClicked(!isTaskClicked)
    }
    const hiddenQuoteClick = () => {
        SetIsHiddenQuote(!isHiddenQuote);
    }
    const toggleTimerClick = () => {
        SetIsQuoteIconClicked(false);
        SetIsTimerClicked(!isTimerClicked)
        SetDisplayTimer(isTimerClicked && displayTimer === "none"? "block":"none");
    }
    const toggleQuoteClick = () => {
        SetIsQuoteIconClicked(!isQuoteIconClicked);
    }
    const toggleImageMenu = () => {
        SetIsImageIconOpen(!isImageIconOpen);
    };
    useEffect( () => {
        SetDisplayTimer(isTimerClicked && displayTimer === "none"? "block":"none");
        // eslint-disable-next-line
    },[isTimerClicked]);

    useEffect(() => {
        shuffleQuote();
    }, []);
    return (
        <div className={styles.room_container}>
            <div className={styles.room_container_wrapper}>
                <div className={styles.header_container}>
                    <div className={styles.header_container_wrapper}>
                        <ul>
                            <li>
                                <FaIcon.FaImage onClick={toggleImageMenu} className={styles.header_icon} size={35} />
                                <span className={styles.icon_description}>Space</span>
                            </li>
                            <li>
                                <TFIIcon.TfiTimer onClick={toggleTimerClick} className={styles.header_icon} size={35} />
                                <span className={styles.icon_description}>Timer</span>
                            </li>
                            <li>
                                <FaIcon.FaTasks onClick={toggleTaskClick} className={styles.header_icon} size={35} />
                                <span className={styles.icon_description}>Task</span>
                            </li>
                            <li>
                                <FaIcon.FaQuoteRight onClick={toggleQuoteClick} className={styles.header_icon} size={35} />
                                <span className={styles.icon_description}>Quote</span>
                            </li>
                        </ul>
                        {
                            isQuoteIconClicked && (
                                <MotivationalQuoteDropdown shuffleQuote={shuffleQuote} hiddenQuoteClick={hiddenQuoteClick} />
                            )
                        }

                        <Timer displayTimer = {displayTimer}/>


                    </div>
                </div>
                <>
                    <h1> This is header</h1>
                    {
                        // background menu
                        isImageIconOpen && (
                            <BackgroundMenu />
                        )
                    }
                    {
                        isHiddenQuote && (
                            <MotivationalQuote motivationalQuoteData={motivationalQuoteData} />
                        )
                    }
                    {
                        isTaskClicked &&
                        (
                            <TaskManager />
                        )
                    }
                </>
            </div>

        </div>
    );
}

export default Room;