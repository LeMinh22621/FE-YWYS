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
import { TOKEN_KEY } from "../../utils/auth";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import * as IOIcons from "react-icons/io5";

const Room = props => {
    // get Id Params
    const params = useParams();
    const roomId = params.room_id;
    const navigate = useNavigate();
    
    const [zIndex, setZIndex] = useState({
        space: 100,
        timer: 100,
        task: 100,
        quote: 100
    });
    const [displayTimer, SetDisplayTimer] = useState("none");
    const [displayQuote, setDisplayQuote] = useState("none");
    const [displayTaskManager, setDisplayTaskManager] = useState("none");

    const [isImageIconOpen, SetIsImageIconOpen] = useState(false);
    const [isQuoteIconClicked, SetIsQuoteIconClicked] = useState(false);
    const [isHiddenQuote, SetIsHiddenQuote] = useState(true);
    const [isTimerClicked, SetIsTimerClicked] = useState(false);
    const [isTaskClicked, SetIsTaskClicked] = useState(false);
    const [motivationalQuoteData, SetMotivationalQuoteData] = useState({});
    const [timerData, setTimerData] = useState({});
    const [backgroundData, setBackgroundData] = useState({});
    /**
     * 
     */
    useEffect(() => {

        const shuffle = async () =>
        {
            const response = await roomApi.getRandomMotivationQuote();
            console.log(response);
        }

        const handleTabClose = (event) => {
            event.preventDefault();
        
            // Storing the object in session storage
            const cancel = { event };
            sessionStorage.setItem('cancel', JSON.stringify(cancel));

            console.log(event);
            shuffle();
            return (event.returnValue = 'This is my title?');
        };
    
        window.addEventListener('beforeunload', handleTabClose);
    
        return async () => {
            window.removeEventListener('beforeunload', handleTabClose);
        };
      }, []);

    ////
    useEffect( () => {
        console.log(timerData);
    },[timerData]);
    const handleBackClick =  () => {
        // save changed
        const roomData = {
            motivational_quote_id: motivationalQuoteData.motivationalQuoteId,
            background_id: backgroundData.background_id,
            timer_id: timerData.timer_id
        }
        const updateFunc = async () => {
            const updateResponse = await roomApi.updateRoom(roomId, roomData);
            console.log(updateResponse.data);
            if(updateResponse.status)
            {
                // the end step
                navigate("/home", {replace:true});
            }
            else
            {
                toast.error(updateResponse.message);
            }
        } 
        updateFunc();
        
    }
    const shuffleQuote = () => {
        const fetchRandomMotivationalQuote = async (SetMotivationalQuoteData, token) => {
            try {
                const respone = await roomApi.getRandomMotivationQuote();
                SetMotivationalQuoteData(respone.data);
            }
            catch (err) {
                toast.error(err);
            }
            return true;
        }
        fetchRandomMotivationalQuote(SetMotivationalQuoteData, localStorage.getItem(TOKEN_KEY));
    }
    const toggleTaskClick = () => {
        SetIsTaskClicked(!isTaskClicked)
        setDisplayTaskManager(isTaskClicked && displayTaskManager === "none"? "flex":"none");
    }
    const hiddenQuoteClick = () => {
        SetIsHiddenQuote(!isHiddenQuote);
        setDisplayQuote(isHiddenQuote && displayQuote === "none"? "block":"none");
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
    useEffect( () => {
        setDisplayQuote(isHiddenQuote && displayQuote === "none"? "block":"none");
        // eslint-disable-next-line
    },[isHiddenQuote]);
    useEffect( () => {
        setDisplayTaskManager(isTaskClicked && displayTaskManager === "none"? "flex":"none");
        // eslint-disable-next-line
    },[isTaskClicked]);
    useEffect( () => {
        const fetchRoomData = async (roomId) => {
            try{
                const respone = await roomApi.getDetailRoom(roomId);
                if(respone.status)
                {
                    SetMotivationalQuoteData(respone.data.motivational_quote);
                    setBackgroundData(respone.data.background);
                    setTimerData(respone.data.timer);
                    console.log(respone.data);
                }
                else{
                    toast.error(respone.message);
                }
            }
            catch(err){
                toast.error(err);
            }
            return true;
        }
        fetchRoomData(roomId);
    },[roomId]);

    return (
        <div className={styles.room_container}>
            <div className={styles.room_container_wrapper}>
                <div className={styles.header_container}>
                    <div className={styles.header_container_wrapper}>
                        <div onClick={handleBackClick} className={styles.back_arrow_icon}>
                            <IOIcons.IoChevronBack/>
                        </div>
                        <div className={styles.list_item_container}>
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
                        </div>
                        
                        <Timer timerData={timerData} setTimerData={setTimerData} displayTimer = {displayTimer} zIndex={zIndex} setZIndex={setZIndex}/>
                        <MotivationalQuote motivationalQuoteData={motivationalQuoteData} displayQuote={displayQuote} zIndex={zIndex} setZIndex={setZIndex}/>
                    </div>
                </div>
                <>
                <TaskManager displayTaskManager={displayTaskManager} zIndex={zIndex} setZIndex={setZIndex} />
                    <h1> This is header</h1>
                    {
                        // background menu
                        isImageIconOpen && (
                            <BackgroundMenu />
                        )
                    }
                </>
            </div>
        </div>
    );
}

export default Room;