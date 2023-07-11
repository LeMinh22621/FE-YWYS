import React from "react";
import styles from "./DetailUser.module.css"
import * as AIIcons from 'react-icons/ai';
const DetailUser = props => {
    const {...others} = props;
    return (

        <div className={styles.detail_user_container}>
            <div className={styles.background_container}>
            </div>
            <div className={styles.content_container}>
                <div className={styles.header_container}>
                    <h2>Profile</h2>
                    <div className={styles.header_close_icon} onClick={() => others.cancelFunc(false)}>
                        <AIIcons.AiOutlineCloseCircle/>
                    </div>
                </div>
                <div className={styles.body_container}>
                    <div className={styles.row_zone}>
                        <div className={styles.an_row}>
                            <h3>First Name</h3>
                            <input placeholder="First Name"/>
                        </div>
                        <div className={styles.an_row}>
                            <h3>Last Name</h3>
                            <input placeholder="Last Name"/>
                        </div>
                    </div>
                    <div className={styles.row_zone}>
                        <div className={styles.an_row}>
                            <h3>Email</h3>
                            <input placeholder="Email"/>
                        </div>
                        <div className={styles.an_row}>
                            <h3>Password</h3>
                            <input placeholder="Password" type="password"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailUser;