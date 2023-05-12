import React from "react";
import styles from './MotivationalQuote.module.css';

const MotivationalQuote = props => {
    return (
        <div className={styles.motivational_quote_container}>
            <div className={styles.motivational_quote_container_wrapper}>
                <span>"{props.motivationalQuoteData.content}" from {props.motivationalQuoteData.author}</span>
            </div>
        </div>
    );
}

export default MotivationalQuote;