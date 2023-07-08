import React, { useState } from "react";
import styles from './room.module.css';
import * as FaIcon from 'react-icons/fa';
import * as TFIIcon from 'react-icons/tfi';
import BackgroundMenu from "../../components/background_menu/BackgroundMenu";
import MotivationalQuote from "../../components/motivational_quote/MotivationalQuote";
import MotivationalQuoteDropdown from "../../components/motivational_quote_dropdown/motivational_quote/MotivationalQuoteDropdown";
import roomApi from "../../api/roomApi";
import { useEffect } from "react";
import Timer from "../../components/timer/Timer";
import TaskManager from "../../components/task_manager/TaskManager";
import { TOKEN_KEY, decodeToken, getToken } from "../../utils/auth";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import * as IOIcons from "react-icons/io5";
import VideoPlayer from "../../components/video_player/VideoPlayer";

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
    const [displayBackground, setDisplayBackground] = useState("none");
    const [isImageIconOpen, SetIsImageIconOpen] = useState(false);
    const [isQuoteIconClicked, SetIsQuoteIconClicked] = useState(false);
    const [isHiddenQuote, SetIsHiddenQuote] = useState(true);
    const [isTimerClicked, SetIsTimerClicked] = useState(false);
    const [isTaskClicked, SetIsTaskClicked] = useState(false);
    const [motivationalQuoteData, SetMotivationalQuoteData] = useState({});
    const [timerData, setTimerData] = useState({});
    const [backgroundData, setBackgroundData] = useState({});
    const [currentBackgroundVideo, setCurrentBackgroundVideo] = useState(backgroundData);
    /**
     * close tab or browser
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

    const handleBackClick =  () => {
        // save changed
        const roomData = {
            motivational_quote_id: motivationalQuoteData.motivationalQuoteId,
            background_id: backgroundData.background_id,
            timer: timerData
        }
        const updateFunc = async () => {
            console.log(roomData);
            const updateResponse = await roomApi.updateRoom(roomId, roomData);
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
        setDisplayBackground( isImageIconOpen && displayBackground === "none"?"flex":"none");
    };
    /**
     * isTimerClick
     */
    useEffect( () => {
        SetDisplayTimer(isTimerClicked && displayTimer === "none"? "block":"none");
        // eslint-disable-next-line
    },[isTimerClicked]);
    /**
     * is Hidden Quote Click
     */
    useEffect( () => {
        setDisplayQuote(isHiddenQuote && displayQuote === "none"? "block":"none");
        // eslint-disable-next-line
    },[isHiddenQuote]);
    /**
     * isTaskManagerClick
     */
    useEffect( () => {
        setDisplayTaskManager(isTaskClicked && displayTaskManager === "none"? "flex":"none");
        // eslint-disable-next-line
    },[isTaskClicked]);
    /**
     * isImageIconOpen
     */
    useEffect( () => {
        setDisplayBackground( isImageIconOpen && displayBackground === "none"?"flex":"none");
        // eslint-disable-next-line
    },[isImageIconOpen]);
    // check is your room
    const [isYourRoom, setIsYourRoom] = useState(false);
    const [taskManagerData, setTaskManagerData] = useState([]);
    /**
     * Fetch Detail by RoomId
     */
    useEffect( () => {
        const fetchTaskManager = async (roomId) =>{
            try{
                const respone = await roomApi.getListTaskManagerByRoomId(roomId); 
                console.log(respone)
                if(respone.status)
                    setTaskManagerData(respone.data);
                else
                    toast.error(respone.message);
            }
            catch(err)
            {
                toast.error(err);
            }
        }
        const fetchRoomData = async (roomId) => {
            try{
                const respone = await roomApi.getDetailRoom(roomId);
                console.log(respone.data);
                if(respone.status)
                {
                    // set detail room data
                    SetMotivationalQuoteData(respone.data.motivational_quote);
                    setBackgroundData(respone.data.background);
                    setTimerData(respone.data.timer);
                    console.log(respone.data.timer)
                    /**
                     * fetch TaskManager and Task
                     */
                    fetchTaskManager(roomId);
                    // check is your room
                    const userData = decodeToken(getToken());
                    setIsYourRoom(userData.email === respone.data.user.email);
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
    /**
     * Set Video as background
     */
    const [videoId, setVideoId] = useState('');
    useEffect( () => {
        const saveChangeBackground = async () =>{
            try
            {
                const data = {
                    background_id: backgroundData.background_id,
                }
                const response = await roomApi.updateRoom(roomId, data);
                // eslint-disable-next-line
                if(!response.status)
                {
                    toast.error(response.message);
                }
            }
            catch(err)
            {
                toast.error(err);
            }
        }
        if(backgroundData !== null && backgroundData !== undefined && Object.keys(backgroundData).length !== 0)
        {
            setCurrentBackgroundVideo(backgroundData.background_link);
            saveChangeBackground();
        }
        // eslint-disable-next-line
    }, [backgroundData]);
    useEffect( () => {
        if(currentBackgroundVideo !== null && currentBackgroundVideo !== undefined && currentBackgroundVideo !== '')
        {
            const regex = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
            const id = (regex.exec(currentBackgroundVideo));
            setVideoId(id?id[3]:"none");
        }
    }, [currentBackgroundVideo]);
    return (
        <div className={styles.room_container}>
            <VideoPlayer videoId={videoId}/>
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
                                    <MotivationalQuoteDropdown isYourRoom={isYourRoom} shuffleQuote={shuffleQuote} hiddenQuoteClick={hiddenQuoteClick} />
                                )
                            }
                        </div>
                        <Timer isYourRoom={isYourRoom} timerData={timerData} setTimerData={setTimerData} displayTimer = {displayTimer} zIndex={zIndex} setZIndex={setZIndex}/>
                        <MotivationalQuote motivationalQuoteData={motivationalQuoteData} displayQuote={displayQuote} zIndex={zIndex} setZIndex={setZIndex}/>
                    </div>
                </div>
                <>
                    <TaskManager roomId={roomId} taskManagerData={taskManagerData} displayTaskManager={displayTaskManager} zIndex={zIndex} setZIndex={setZIndex} />
                    <BackgroundMenu isYourRoom={isYourRoom} backgroundData={backgroundData} setBackgroundData={setBackgroundData} setCurrentBackgroundVideo={setCurrentBackgroundVideo} displayBackground={displayBackground} zIndex={zIndex} setZIndex={setZIndex}/>
                </>
            </div>
        </div>
    );
}

export default Room;