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

    const [isImageIconOpen, SetIsImageIconOpen] = useState(false);
    const [isQuoteIconClicked, SetIsQuoteIconClicked] = useState(false);
    const [isHiddenQuote, SetIsHiddenQuote] = useState(true);
    const [isTimerClicked, SetIsTimerClicked] = useState(false);
    const [motivationalQuoteData, SetMotivationalQuoteData] = useState({});

    const shuffleQuote = () => {
        const response = fetchData(SetMotivationalQuoteData, "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaG0yazFAZ21haWwuY29tIiwiaWF0IjoxNjgzNzkwMjIzLCJleHAiOjE2ODM4MTkwMjN9.mI7me9-GUp9HpDbgDjHP4RonDjvYm5WR2sG6j9zs6oM");
        console.log(response);
    }
    const hiddenQuoteClick = () => {
        SetIsHiddenQuote(!isHiddenQuote);
    }
    const toggleTimerClick = () => {
        SetIsQuoteIconClicked(false);
        SetIsTimerClicked(!isTimerClicked)
    }
    const toggleQuoteClick = () => {
        SetIsQuoteIconClicked(!isQuoteIconClicked);
    }
    const toggleImageMenu = () => {
        SetIsImageIconOpen(!isImageIconOpen);
    };

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
                            </li>
                            <li>
                                <TFIIcon.TfiTimer onClick={toggleTimerClick} className={styles.header_icon} size={35} />
                            </li>
                            <li>
                                <FaIcon.FaTasks className={styles.header_icon} size={35} />
                            </li>
                            <li>
                                <FaIcon.FaQuoteRight onClick={toggleQuoteClick} className={styles.header_icon} size={20} />
                            </li>
                        </ul>
                        {
                            isQuoteIconClicked && (
                                <MotivationalQuoteDropdown shuffleQuote={shuffleQuote} hiddenQuoteClick={hiddenQuoteClick} />
                            )
                        }
                        {
                            isTimerClicked && (
                                <Timer/>
                            )
                        }
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
                </>
            </div>

        </div>
    );
}

export default Room;