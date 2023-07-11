import React from "react";
import styles from "./ChangeColorMenu.module.css";

const ChangeColorMenu = props => {
    const {keyLabel, ...other} = props;
    const colorList = [
        { key: 1, color: "rgb(255, 0, 0)", colorName: "Red" },
        { key: 2, color: "rgb(0, 255, 0)", colorName: "Green" },
        { key: 3, color: "rgb(0, 0, 255)", colorName: "Blue" },
        { key: 4, color: "rgb(255, 255, 0)", colorName: "Yellow" },
        { key: 5, color: "rgb(255, 0, 255)", colorName: "Magenta" },
        { key: 6, color: "rgb(0, 255, 255)", colorName: "Cyan" },
        { key: 7, color: "rgb(255, 165, 0)", colorName: "Orange" },
        { key: 8, color: "rgb(128, 0, 128)", colorName: "Purple" },
        { key: 9, color: "rgb(128, 128, 128)", colorName: "Gray" },
        { key: 10, color: "rgb(0, 0, 0)", colorName: "Black" },
        { key: 11, color: "rgb(255, 255, 255)", colorName: "White" },
        { key: 12, color: "rgb(128, 0, 0)", colorName: "Maroon" },
        { key: 13, color: "rgb(0, 128, 0)", colorName: "Green" },
        { key: 14, color: "rgb(0, 0, 128)", colorName: "Navy" },
        { key: 15, color: "rgb(128, 128, 0)", colorName: "Olive" },
        { key: 16, color: "rgb(128, 0, 128)", colorName: "Indigo" },
        { key: 17, color: "rgb(0, 128, 128)", colorName: "Teal" },
        { key: 18, color: "rgb(165, 42, 42)", colorName: "Brown" },
        { key: 19, color: "rgb(255, 192, 203)", colorName: "Pink" },
        { key: 20, color: "rgb(0, 255, 0)", colorName: "Lime" },
        { key: 21, color: "rgb(255, 255, 224)", colorName: "LightYellow" },
        { key: 22, color: "rgb(135, 206, 235)", colorName: "SkyBlue" },
        { key: 23, color: "rgb(218, 165, 32)", colorName: "Goldenrod" },
        { key: 24, color: "rgb(144, 238, 144)", colorName: "LightGreen" },
        { key: 25, color: "rgb(255, 0, 255)", colorName: "Fuchsia" },
        { key: 26, color: "rgb(240, 230, 140)", colorName: "Khaki" },
        { key: 27, color: "rgb(224, 255, 255)", colorName: "LightCyan" },
        { key: 28, color: "rgb(205, 92, 92)", colorName: "IndianRed" },
        { key: 29, color: "rgb(255, 105, 180)", colorName: "HotPink" },
        { key: 30, color: "rgb(255, 250, 205)", colorName: "LemonChiffon" }
    ];
    const handleChangeColor = (event) => {
        const backgroundColor = window.getComputedStyle(event.target).backgroundColor;
        other.handleChangeColor(backgroundColor);
    }
    return (
        <div className={styles.change_color_container}>
            <div className={styles.change_color_container_wrapper}>
                {
                    colorList.map(
                        (cl) => (
                            <div key={cl.key} 
                                onClick={handleChangeColor} 
                                style={{ backgroundColor: cl.color }} 
                                className={styles.color_item}>
                                {cl.colorName}
                            </div>
                        )
                    )
                }
            </div>
        </div>
    );
}
export default ChangeColorMenu;