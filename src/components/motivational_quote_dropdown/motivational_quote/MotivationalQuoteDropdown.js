import React, { useState } from "react";
import styles from './MotivationalQuoteDropdown.module.css';

const MotivationalQuoteDropdown = props => {

    const [isHidden,SetIsHidden] = useState(true);

    const hiddenOnClick = () => {
        SetIsHidden(!isHidden);
        props.hiddenQuoteClick(!isHidden);
    }
    const shuffleQuoteOnClick = () => {
        props.shuffleQuote();
    }

    return (
        <div className={styles.motivational_quote_dropdown_container}>
            <div className={styles.motivational_quote_dropdown_container_wrapper}>
                <ul>
                    <li onClick={hiddenOnClick}>Hidden</li>
                    <li onClick={shuffleQuoteOnClick}>Shuffle</li>
                </ul>
            </div>
        </div>
    );
}

export default MotivationalQuoteDropdown;