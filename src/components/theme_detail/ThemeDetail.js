import React, { useEffect, useState } from "react";
import styles from "./ThemeDetail.module.css";
import * as AIIcons from 'react-icons/ai';

const ThemeDetail = props => {
    const {title, themeData, ...others} = props;
    const [themeName, setThemeName] = useState(themeData?.theme_name);
    const handleChangeThemeName = (e) =>{
        setThemeName(e.target.value);
    }
    return (
        <div className={styles.theme_container}>
            <div className={styles.theme_container_wrapper}></div>
            <div className={styles.theme_container_content}>
                <div className={styles.header_container}>
                    <h1>{title}</h1>
                    <div className={styles.close_icon} onClick={() => others.cancelFunc(false)}>
                        <AIIcons.AiOutlineCloseCircle/>
                    </div>
                </div>
                <div className={styles.inputs}>
                    <input value={themeName} onChange={(e) => handleChangeThemeName(e)}/>
                </div>

                <button onClick={() => others.okFunc(themeName)}>OK</button>
            </div>
        </div>
    );
}


export default ThemeDetail;