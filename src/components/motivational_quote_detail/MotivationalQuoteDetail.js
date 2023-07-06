import React from "react";
import styles from "./MotivationalQuoteDetail.module.css"
import * as AIIcons from 'react-icons/ai';
import { useState } from "react";

const MotivationalQuoteDetail = props => {
    const {title, quoteData, ...others} = props;
    const [author, setAuthor] = useState(quoteData?.author);
    const [content, setContent] = useState(quoteData?.content);
    return (
        <div className={styles.quote_detail_container}>
            <div className={styles.quote_detail_container_wrapper}></div>
            <div className={styles.quote_detail_container_content}>
                <div className={styles.header_container}>
                    <h1>{title}</h1>
                    <div className={styles.close_icon} onClick={() => others.cancelFunc(false)}>
                        <AIIcons.AiOutlineCloseCircle/>
                    </div>
                </div>
                <div className={styles.body_container}>
                    <div className={styles.inputs}>
                        <h2>Content</h2>
                        <input value={content} onChange={(e) => setContent(e.target.value)}/>

                        <h2>Author</h2>
                        <input value={author} onChange={(e) => setAuthor(e.target.value)}/>
                    </div>
                    <button onClick={() => others.okFunc(content, author)}>OK</button>
                </div>
            </div>
        </div>
    );
}

export default MotivationalQuoteDetail;