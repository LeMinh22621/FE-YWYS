import React from "react";
import styles from "./BackgroundTheme.module.css";

const BackgroundTheme = props => {
    const {themes, selectedTheme, ...others} = props;

    const handleThemeChange = (event) => {
        others.setSelectedTheme(themes.filter(theme => theme.theme_id === event.target.value)[0]);
    };

    return (
        <div className={styles.background_theme_container} >
            <select className={styles.selection} value={selectedTheme?.theme_id} onChange={handleThemeChange}>
                {
                    themes?.map( (theme) => {
                        return (
                            <option key={theme.theme_id} className={styles.an_option} value={theme.theme_id}>{theme.theme_name}</option>
                        );
                    })
                }
            </select>
        </div>
    );
}
export default BackgroundTheme;