import React from "react";
import styles from './background_menu.module.css';
import BackgroundSlide from "../background_slide/BackgroundSlide";

const BackgroundMenu = props => {
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