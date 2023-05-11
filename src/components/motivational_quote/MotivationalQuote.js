import React from "react";
import styles from './MotivationalQuote.module.css';

const MotivationalQuote = props => {
    return (
        <div className={styles.motivational_quote_container}>
            <div className={styles.motivational_quote_container_wrapper}>
                <h2>{props.motivationalQuoteData.content}</h2>
                <h3>{props.motivationalQuoteData.author}</h3>
            </div>
        </div>
    );
}

export default MotivationalQuote;