import React, { useState } from "react";
import styles from './MotivationalQuoteDropdown.module.css';
import * as AIIcons from "react-icons/ai";
import * as CGIcons from "react-icons/cg";

const MotivationalQuoteDropdown = props => {
    const {isYourRoom, ...others} = props;
    const [isHidden, SetIsHidden] = useState(true);

    const hiddenOnClick = () => {
        SetIsHidden(!isHidden);
        others.hiddenQuoteClick(!isHidden);
    }
    const shuffleQuoteOnClick = () => {
        others.shuffleQuote();
    }

    return (
        <div className={styles.motivational_quote_dropdown_container}>
            <div className={styles.motivational_quote_dropdown_container_wrapper}>
                <ul>
                    <li onClick={hiddenOnClick}>
                        <AIIcons.AiFillEyeInvisible size={23}/>
                        Hidden
                    </li>
                    {
                        isYourRoom && 
                        <li onClick={shuffleQuoteOnClick}>
                            <CGIcons.CgArrowsExchange size={23} />
                            Shuffle
                        </li>
                    }
                    
                </ul>
            </div>
        </div>
    );
}

export default MotivationalQuoteDropdown;