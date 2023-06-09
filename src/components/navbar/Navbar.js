import React from 'react';
import styles from '../navbar/style.module.css';
import * as HIIcons from "react-icons/hi";
import avatar from "../../assets/images/avatar.jpg";

const Navbar = () => {
    return (
        <div className={styles.navbar__container}>
            <div className={styles.navbar__container_wrapper}>

                {/* home icon */}
                <div className={styles.home_icon_container} >
                    <HIIcons.HiHome size={40} className={styles.home_icon} />
                </div>

                {/* navbar list */}
                <div className={styles.navbar__list_container}>
                    <div className={styles.navbar__list_wrapper}>
                        <ul>
                            <li>
                                <a href='#!'>Room</a>
                            </li>
                            <li>
                                <a href='#!'>Task</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* profile + name */}
                <div className={styles.wrapper_profile}>
                    <div className={styles.my_infor}>
                        <p>Le Minh</p>
                        <div className={styles.img_container}>
                            <img
                                className={styles.img_avt}
                                src={avatar}
                                alt='error'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;