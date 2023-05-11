import React from "react";
import styles from './backgroundMenu.module.css';
import BackgroundSlide from "../background_slide/BackgroundSlide";

import roomApi from "../../api/roomApi";

const fetchData = async (payload) => {

    try{
        const { themeId, token } = payload;

        const respone = await roomApi.getBackgrondListByThemeId(themeId, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return respone.message;
    }
    catch(err)
    {
        alert(err.message);
    }
}

const BackgroundMenu = props => {

    const payload = {
        themeId: "0ea23b23-a38d-4f40-9111-22517afb0ec6",
        token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaG0yazFAZ21haWwuY29tIiwiaWF0IjoxNjgzNzA4Mjc1LCJleHAiOjE2ODM3MzcwNzV9.L0g2gfR_BQ74S4BrTbfuL3uMrqDEN5YHsChm2vy4P8E"
    };

    const response = fetchData(payload);
    console.log(response);

    const images = [
        {index: 0, url: "http://placekitten.com/g/400/200", caption: "caption 1"},
        {index: 1, url: "https://placekitten.com/500/200", caption: "caption 2"},
        {index: 2, url: "http://placekitten.com/g/600/200", caption: "caption 3"},
        {index: 3, url: "http://placekitten.com/g/700/200", caption: "caption 4"}
    ];
    return (
        <div className={styles.background_menu_container}>
            <div className={styles.background_menu_container_wrapper}>
                {/* <BackgroundTheme/> */}
                <BackgroundSlide images = {images}/>
            </div>
        </div>
    );
}

export default BackgroundMenu;