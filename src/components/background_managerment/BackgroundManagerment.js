import React, { useEffect, useState } from "react";
import styles from "./BackgroundManagerment.module.css";
import roomApi from "../../api/roomApi";
import { toast } from "react-toastify";
import AddBackgroundPopup from "../add_background_popup/AddBackgroundPopup";

export const ThemeTable = props => {
    const {data, ...others} = props;
    const [activeRow, setActiveRow] = useState(0);
    const handleThemeRowClick = (theme) => {
        others.setCurrentTheme(theme)
        others.setCurrentBackgrounds(theme?.background_list)
    }
      return (
        <div className={styles.theme_table}>
          <div className={styles.table_header}>
              <div className={styles.header_item}>ID</div>
              <div className={styles.header_item}>Name</div>
              <div className={styles.header_item}/>
              <div className={styles.header_item}>
                <button className={styles.add_button}>Add</button>
              </div>
          </div>
          <div className={styles.table_body}>
            {data?.map((item, index) => (
              <div className={index === activeRow?`${styles.body_row} ${styles.body_row_active}`:styles.body_row} key={item.theme_id} onClick={() => {handleThemeRowClick(data[index]); setActiveRow(index)}}>
                <div className={`${styles.row_item} ${styles.row_item_id}`}>{item.theme_id}</div>
                <div className={styles.row_item}>{item.theme_name}</div>
                <div className={styles.row_item}/>
                <div className={styles.row_item}>
                  <button className={styles.delete_button}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
  };

  export const BackgroundTable = props => {
    const {data, ...others} = props;
    const handleAddBackground = () => {
        others.setIsBackgroundAddClick(true);
    }
      return (
        <div className={styles.theme_table}>
          <div className={styles.table_header}>
              <div className={styles.header_item}>ID</div>
              <div className={styles.header_item}>Video Link</div>
              <div className={styles.header_item}>Image Link</div>
              <div className={styles.header_item}>
                <button className={styles.add_button} onClick={handleAddBackground}>Add</button>
              </div>
          </div>
          <div className={styles.table_body}>
            {data?.map((item, index) => (
              <div className={styles.body_row} key={item.background_id} >
                <div className={`${styles.row_item} ${styles.row_item_id}`}>{item.background_id}</div>
                <div className={`${styles.row_item} ${styles.row_item_id}`}>{item.background_link}</div>
                <div className={`${styles.row_item} ${styles.row_item_id}`}>{item.image_link}</div>
                <div className={styles.row_item}>
                  <button className={styles.delete_button}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
  };
const BackgroundManagerment = props =>{
    const [themes, setThemes] = useState([]);
    const [currentBackgrounds, setCurrentBackgrounds] = useState([]);
    const [isBackgroundAddClick, setIsBackgroundAddClick] = useState(false);
    const [currentTheme, setCurrentTheme] = useState({});
    useEffect( () => {
        const fetchData = () => {
            const getThemes = async () => {
                const response = await roomApi.getAllThemes();
                if(response.status)
                {
                    setThemes(response.data);
                    setCurrentBackgrounds(response.data[0].background_list);
                    setCurrentTheme(response.data[0]);
                }
                    
                else
                    toast.error(response.message);
            }
            getThemes();
        }
        fetchData();
    }, []);
    // const [currentBackground, setCurrentBackground] = useState({});
    return (
        <div className={styles.background_managerment_container}>
            <h1>Themes</h1>
            <ThemeTable data={themes}  setCurrentTheme = {setCurrentTheme} setCurrentBackgrounds={setCurrentBackgrounds} />
            <h1>Backgrounds</h1>
            <BackgroundTable data={currentBackgrounds} setIsBackgroundAddClick={setIsBackgroundAddClick} />
            {
                isBackgroundAddClick && <AddBackgroundPopup
                                            currentTheme={currentTheme}
                                            currentBackgrounds={currentBackgrounds} 
                                            setIsBackgroundAddClick={setIsBackgroundAddClick}
                                        />
            }
        </div>
    );
}

export default BackgroundManagerment;