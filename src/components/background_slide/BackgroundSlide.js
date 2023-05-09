import React, { useState } from 'react';
import styles from './backgroundSlide.module.css';
import * as GRIcons from 'react-icons/gr';

const BackgroundSlide = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    function handlePrevClick() {
        const lastIndex = images.length - 1;
        const shouldResetIndex = currentIndex === 0;
        const index = shouldResetIndex ? lastIndex : currentIndex - 1;
        setCurrentIndex(index);
    }

    function handleNextClick() {
        const lastIndex = images.length - 1;
        const shouldResetIndex = currentIndex === lastIndex;
        const index = shouldResetIndex ? 0 : currentIndex + 1;
        setCurrentIndex(index);
    }

    return (
        <div className= {styles.slider_container}>
            <div className= {styles.slider_container_wrapper}>
                <button className={styles.slider_button} onClick={handlePrevClick}> <GRIcons.GrFormPrevious/> </button>
                <img className={styles.slider_image} src={images[currentIndex].url} alt={`${images[currentIndex].caption}`} />
                <button className={styles.slider_button} onClick={handleNextClick}> <GRIcons.GrFormNext color='white'/> </button>
            </div>
        </div>
      );
};

export default BackgroundSlide;