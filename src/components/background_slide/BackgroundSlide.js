import React, { useState } from 'react';
import styles from './backgroundSlide.module.css';
import * as GRIcons from 'react-icons/gr';
import { useEffect } from 'react';

const BackgroundSlide = props => {
    const { currentBackground, backgroundList, ...others } = props;
    
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect( () => {
        if(currentBackground !== null && currentBackground !== undefined && backgroundList !== null && backgroundList !== undefined && backgroundList?.length !== 0)
        {
            const index = backgroundList.findIndex( b => b.background_id === currentBackground.background_id);
            // eslint-disable-next-line
            setCurrentIndex(index);
        }
    }, [currentBackground])
    const handlePrevClick = () => {
        setCurrentIndex(currentIndex === 0? backgroundList?.length - 1 : currentIndex - 1);
    }

    const handleNextClick = () => {
        setCurrentIndex(currentIndex === backgroundList?.length - 1? 0 : currentIndex + 1);
    }
    useEffect( () => {
        if(backgroundList !== null && backgroundList !== undefined)
        {
            others.setCurrentBackground(backgroundList[currentIndex]);
            // eslint-disable-next-line
        }
    },[currentIndex]);

    const handleBackgroundClick = () => {
        others.setBackgroundData(currentBackground);
    }
    return (
        <div className= {styles.slider_container}>
            <div className= {styles.slider_container_wrapper}>
                <button className={styles.slider_button} onClick={handlePrevClick}> <GRIcons.GrFormPrevious/> </button>
                <img onClick={handleBackgroundClick} className={styles.slider_image} src={currentBackground?.image_link} alt={"Have no background!"} />
                <button className={styles.slider_button} onClick={handleNextClick}> <GRIcons.GrFormNext color='white'/> </button>
            </div>
        </div>
      );
};

export default BackgroundSlide;