import React from 'react';
import styles from '../header/style.module.css';
import avatar from "../../assets/images/avatar.jpg";
const Header = () => {
  return (
    <div className={styles.header__container}>
        <div className={styles.header__container_wrapper}>
            <div className={styles.logo}>
                <p>TODO LIST</p>
            </div>
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
  )
}
export default Header;
