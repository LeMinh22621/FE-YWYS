import React from "react";
import styles from "./ConfirmAlert.module.css";

const ConfirmAlert = props =>{
    const {title, ...others} = props;
    return (
        <div className={styles.alert_container}>
            <div className={styles.background_container}/>
            <div className={styles.content_container}>
                <div className={styles.display_content}>
                    <span>{title}</span>
                </div>
                <div className={styles.button_container}>
                    <button style={{background: "lime"}} onClick={() => others.okFunc()}>OK</button>
                    <button style={{background: "red"}} onClick={() => others.cancelFunc(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmAlert;