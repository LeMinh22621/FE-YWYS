import React from 'react';
import styles from '../navbar/style.module.css';
import * as Unicons from '@iconscout/react-unicons';
const Navbar = () => {
    return (
        <div className={styles.navbar__container}>
           <div className={styles.navbar__container_wrapper}>
                <div className={styles.home_icon_container} >
                    <Unicons.UilHome size={30} className={styles.home_icon}/>
                </div>
           </div>
        </div>
    );
}

export default Navbar;