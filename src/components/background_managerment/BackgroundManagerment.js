import React, { useEffect, useState } from "react";
import styles from "./BackgroundManagerment.module.css";
import roomApi from "../../api/roomApi";
import { toast } from "react-toastify";
import AddBackgroundPopup from "../add_background_popup/AddBackgroundPopup";
import ConfirmAlert from "../confirm_alert/ConfirmAlert";
import adminApi from "../../api/adminApi";
import BackgroundDetail from "../background_detail/BackgroundDetail";
import ThemeDetail from "../theme_detail/ThemeDetail";

export const ThemeTable = props => {
  const { data, ...others } = props;
  const [activeRow, setActiveRow] = useState(0);
  const handleThemeRowClick = (theme) => {
    console.log(theme);
    others.setCurrentTheme(theme)
    others.setCurrentBackgrounds(theme?.background_list)
  }
  // delete theme
  const [isDeleteClick, setIsDeteleClick] = useState(false);
  const [deleteThemeId, setDeleteThemeId] = useState(null);
  const handleDeleteButtonClick = (themeId) => {
    setIsDeteleClick(!isDeleteClick);
    setDeleteThemeId(themeId);
  }
  const handleDeleteOnAlert = async () => {
    /**
     * Delete to Server
     */
    const response = await adminApi.deleteThemeById(deleteThemeId);
    if (response.status) {
      /**
     * Update UI
     */
      others.setThemes(data.filter(theme => theme.theme_id !== deleteThemeId));
      setIsDeteleClick(!isDeleteClick);
    }
    else
      toast.error(response.message);
  }
  // edit theme
  const [editThemeData, setEditThemeData] = useState(null);
  const [isThemeEditClick, setIsThemeEditClick] = useState(false);
  const handleEditClick = (theme) => {
    setEditThemeData(theme);
    setIsThemeEditClick(!isThemeEditClick);
  }
  const handleEditThemeAlert = async (newThemeName) =>
  {
    const newThemeData = {...editThemeData, 'theme_name': newThemeName };
    const response = await adminApi.updateTheme(editThemeData.theme_id, newThemeData);
    if(response.status)
    {
      console.log(data.filter(theme => theme.theme_id === response.data.theme_id)[0], response.data);
      data[data.indexOf(data.filter(theme => theme.theme_id === response.data.theme_id)[0])].theme_name = response.data.theme_name;

      others.setThemes([...data]);
      setIsThemeEditClick(!isThemeEditClick);
    }
    else
      toast.error(response.message);
  }
  // add theme
  const [isAddThemeClick, setIsAddThemeClick] = useState(false);
  const handleAddNewThemeAlert = async (themeName) =>
  {
    const newTheme = {'theme_name': themeName};
    const response = await adminApi.addNewTheme(newTheme);
    if(response.status)
    {
      setIsAddThemeClick(!isAddThemeClick);
      console.log(response);
      others.setThemes([...data, response.data]);
    }
    else
    {
      toast.error(response.message);
    }
  }
  return (
    <div className={styles.theme_table}>
      <div className={styles.table_header}>
        <div className={styles.header_item}>ID</div>
        <div className={styles.header_item}>Name</div>
        <div className={styles.header_item} />
        <div className={styles.header_item}>
          <button className={styles.add_button} onClick={()=>setIsAddThemeClick(!isAddThemeClick)}>Add</button>
        </div>
      </div>
      <div className={styles.table_body}>
        {data?.map((item, index) => (
          <div className={index === activeRow ? `${styles.body_row} ${styles.body_row_active}` : styles.body_row} key={item.theme_id} onClick={() => { handleThemeRowClick(data[index]); setActiveRow(index) }}>
            <div className={`${styles.row_item} ${styles.row_item_id}`}>{item.theme_id}</div>
            <div className={styles.row_item}>{item.theme_name}</div>
            <div className={styles.row_item} />
            <div className={styles.row_item}>
              <button className={styles.delete_button} onClick={() => handleDeleteButtonClick(data[index].theme_id)}>Delete</button>
              <button onClick={() => handleEditClick(data[index])}>Edit</button>
            </div>
          </div>
        ))}
      </div>
      {
        isDeleteClick && <ConfirmAlert title={`Would yout like to delete ${deleteThemeId} ?`} cancelFunc={setIsDeteleClick} okFunc={handleDeleteOnAlert}/>
      }
      {
        isThemeEditClick && <ThemeDetail title={"Edit Theme"} themeData={editThemeData} setThemeData={setEditThemeData} okFunc={handleEditThemeAlert} cancelFunc={setIsThemeEditClick}/>
      }
      {
        isAddThemeClick && <ThemeDetail title={"Add Theme"} okFunc={handleAddNewThemeAlert} cancelFunc={setIsAddThemeClick}/>
      }
    </div>
  );
};

export const BackgroundTable = props => {
  const { data, ...others } = props;
  const handleAddBackground = () => {
    others.setIsBackgroundAddClick(true);
  }
  // Detele Background
  const [isDeleteClick, setIsDeteleClick] = useState(false);
  const [deleteBackgroundId, setDeleteBackgroundId] = useState(null);
  const handleDeleteButtonClick = (backgroundId) => {
    setIsDeteleClick(!isDeleteClick);
    setDeleteBackgroundId(backgroundId);
  }
  const handleDeleteOnAlert = async () => {
    /**
     * Delete to Server
     */
    const response = await adminApi.deleteBackgroundById(deleteBackgroundId);
    if (response.status) {
      /**
     * Update UI
     */
      others.setCurrentBackgrounds(data.filter(background => background.background_id !== deleteBackgroundId));
      setIsDeteleClick(!isDeleteClick);
    }
    else
      toast.error(response.message);
  }
  // Edit background
  const [editBackgroundData, setEditBackgroundData] = useState(null);
  const [isBackgroundEditClick, setIsBackgroundEditClick] = useState(false);
  const handleEditClick = (backgroundData) => {
    setEditBackgroundData(backgroundData);
    setIsBackgroundEditClick(!isBackgroundEditClick);
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
          <div className={styles.body_row} key={item.background_id} onClick={() => handleEditClick(data[index])}>
            <div className={`${styles.row_item} ${styles.row_item_id}`}>{item.background_id}</div>
            <div className={`${styles.row_item} ${styles.row_item_id}`}>{item.background_link}</div>
            <div className={`${styles.row_item} ${styles.row_item_id}`}>{item.image_link}</div>
            <div className={styles.row_item}>
              <button className={styles.delete_button} onClick={() => handleDeleteButtonClick(data[index].background_id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      {
        isDeleteClick && <ConfirmAlert title={`Would you like to deleted ${deleteBackgroundId} background?`} cancelFunc={setIsDeteleClick} okFunc={handleDeleteOnAlert} />
      }
      {
        isBackgroundEditClick && <BackgroundDetail title={"Edit Background"} backgroundData={editBackgroundData} cancelFunc={setIsBackgroundEditClick} />
      }
    </div>
  );
};
const BackgroundManagerment = props => {
  const [themes, setThemes] = useState([]);
  const [currentBackgrounds, setCurrentBackgrounds] = useState([]);
  const [isBackgroundAddClick, setIsBackgroundAddClick] = useState(false);
  const [currentTheme, setCurrentTheme] = useState({});
  useEffect(() => {
    const fetchData = () => {
      const getThemes = async () => {
        const response = await roomApi.getAllThemes();
        if (response.status) {
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
      <ThemeTable data={themes} setCurrentTheme={setCurrentTheme} setThemes={setThemes} setCurrentBackgrounds={setCurrentBackgrounds}/>
      <h1>Backgrounds</h1>
      <BackgroundTable data={currentBackgrounds} setCurrentBackgrounds={setCurrentBackgrounds} setIsBackgroundAddClick={setIsBackgroundAddClick} />
      {
        isBackgroundAddClick && <AddBackgroundPopup
          currentTheme={currentTheme}
          currentBackgrounds={currentBackgrounds}
          setCurrentBackgrounds={setCurrentBackgrounds}
          setIsBackgroundAddClick={setIsBackgroundAddClick}
        />
      }
    </div>
  );
}

export default BackgroundManagerment;