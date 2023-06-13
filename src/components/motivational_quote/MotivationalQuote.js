import React from "react";
import styles from './MotivationalQuote.module.css';
import { useState } from "react";
import { useEffect } from "react";

const MotivationalQuote = props => {
    const {displayQuote, zIndex, ...others} = props;
    const [curZIndex, setCurZIndex] = useState(zIndex.quote);
    /**
     * Drag drop motivational quote
     */
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
        setCurZIndex(zIndex.quote);
    },[zIndex])

    const handleMouseUp = () => {
        setDragging(false);
        setCursor("grab");
        others.setZIndex({
            space: curZIndex,
            timer: curZIndex,
            task: curZIndex,
            quote: curZIndex + 1
        });
    };

    return (
        <div className={styles.motivational_quote_container} style={{
                position: 'fixed',
                left: position.left + 'px',
                top: position.top + 'px',
                cursor: `${cursor}`,
                display: `${displayQuote}`,
                zIndex: `${curZIndex}`
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}>

            <div className={styles.motivational_quote_container_wrapper}>
                <span>"{props.motivationalQuoteData.content}" from {props.motivationalQuoteData.author}</span>
            </div>
        </div>
    );
}

export default MotivationalQuote;