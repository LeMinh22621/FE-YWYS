import React, { useState } from "react";
import styles from './room.module.css';
import * as FaIcon from 'react-icons/fa';
import * as TFIIcon from 'react-icons/tfi';

import BackgroundMenu from "../background_menu/BackgroundMenu";
const Room = props => {

    const [isImageIconOpen, SetIsImageIconOpen] = useState(false);

    const toggleImageMenu = () => {
        SetIsImageIconOpen(!isImageIconOpen);
    };

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
                                <TFIIcon.TfiTimer className={styles.header_icon} size={35} />
                            </li>
                            <li>
                                <FaIcon.FaTasks className={styles.header_icon} size={35} />
                            </li>
                            <li>
                                <FaIcon.FaQuoteRight className={styles.header_icon} size={20} />
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <h1> This is header</h1>
                    {
                        // background menu
                        isImageIconOpen && (
                            <BackgroundMenu/>
                        )
                    }
                </div>
            </div>

        </div>
    );
}

export default Room;