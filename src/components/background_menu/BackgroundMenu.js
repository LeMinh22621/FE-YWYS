import React, { useEffect, useState } from "react";
import styles from './backgroundMenu.module.css';

import roomApi from "../../api/roomApi";
import { toast } from "react-toastify";
import BackgroundTheme from "../background_theme/BackgroundTheme";
import BackgroundSlide from "../background_slide/BackgroundSlide";

const BackgroundMenu = props => {
    const {backgroundData, displayBackground, zIndex, ...others} = props;
    const [currentBackground, setCurrentBackground] = useState(backgroundData);

    const [selectedTheme, setSelectedTheme] = useState({});
    const [themes, setThemes] = useState(null);
    const [backgroundList, setBackgroundList] = useState(null);
    /**
     * Fetch all Themes from DB
     */
    useEffect( () => {
        const fetchAllThemes = async () => {
            try{
                const response = await roomApi.getAllThemes();
                if(response.status)
                {
                    setThemes(response.data);
                    setSelectedTheme(response.data.filter( theme => theme.theme_id === backgroundData.theme.theme_id)[0]);
                }
                else{
                    toast.error(response.message)
                }
            }
            catch(err)
            {
                toast.error(err);
            }
        }
        fetchAllThemes();
    }, []);
    /**
     * Initial Data
     */
    useEffect( () => {
        if(backgroundData !== null && backgroundData !== undefined && Object.keys(backgroundData).length !== 0)
        {
            setCurrentBackground({...backgroundData, theme_id:(backgroundData.theme_id === undefined)?backgroundData.theme.theme_id: backgroundData.theme_id});
        }
    }, [backgroundData])

    useEffect( () => {
    }, [currentBackground]);

    /**
     * Set backgroundList when selectedTheme changed
     */
    useEffect( () => {
        if(selectedTheme !== null && selectedTheme !== undefined && Object.keys(selectedTheme).length !== 0)
        {
            setBackgroundList(selectedTheme.background_list);
        }
    }, [selectedTheme]);
    /**
     * Drag drop BackgroundMenu
     */
    const [curZIndex, setCurZIndex] = useState(zIndex.space);
    const [position, setPosition] = useState({ left: 50, top: 50 });
    const [dragging, setDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [cursor, setCursor] = useState('grab');
    const handleMouseDown = (event) => {
        setDragging(true);
        setCursor("grabbing");
        setCurZIndex(curZIndex + 2);
        setStartPos({ x: event.clientX, y: event.clientY });
    };
    const handleMouseMove = (event) => {
        if (!dragging) return;

        const offsetX = event.clientX - startPos.x;
        const offsetY = event.clientY - startPos.y;

        setPosition((prevPosition) => ({
            left: prevPosition.left + offsetX,
            top: prevPosition.top + offsetY,
        }));

        setStartPos({ x: event.clientX, y: event.clientY });
    };

    useEffect( () => {
        setCurZIndex(zIndex.space);
    },[zIndex])

    const handleMouseUp = () => {
        setDragging(false);
        setCursor("grab");
        others.setZIndex({
            space: curZIndex + 1,
            timer: curZIndex,
            task: curZIndex,
            quote: curZIndex
        });
    };
    /**
     * change video link
     */
    const [bgvideoLink, setBgVideoLink] = useState('');
    const handleChangeVideoLink = (event) => { 
        setBgVideoLink(event.target.value);
    }
    const handleOKClick = () => {
        if(bgvideoLink !== null && bgvideoLink !== undefined && bgvideoLink !== '')
            others.setCurrentBackgroundVideo(bgvideoLink);
    }
    useEffect(() => {
        if(backgroundList !== null && backgroundList !== undefined && backgroundList.length !== 0){
            setCurrentBackground(selectedTheme.background_list[0]);
            // eslint-disable-next-line
        }
    }, [backgroundList])
    return (
        <div className={styles.background_menu_container} style={{
            position: 'fixed',
            left: position.left + 'px',
            top: position.top + 'px',
            cursor: `${cursor}`,
            display: `${displayBackground}`,
            zIndex: `${curZIndex}`
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}>
            <div className={styles.header_container}>
                <div className={styles.header_container_wrapper}>
                    <h1>Space</h1>
                    <BackgroundTheme selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme} themes={themes} />
                </div>
            </div>
            <div className={styles.background_menu_container_wrapper}>
                <BackgroundSlide currentBackground={currentBackground} setCurrentBackground={setCurrentBackground} setBackgroundData={others.setBackgroundData} backgroundList = {backgroundList}/>

                <div className={styles.youtube_link_input_container}>
                    <h3>Youtube Link</h3>
                    <div className={styles.youtube_link_input_container_wrapper}>
                        <input type="url" onChange={handleChangeVideoLink}/>
                        <button type="button" onClick={handleOKClick}>OK</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BackgroundMenu;