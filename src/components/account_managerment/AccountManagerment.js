import React from "react";
import styles from "./AccountManagerment.module.css";
import { useState } from "react";
import { useEffect } from "react";
import adminApi from "../../api/adminApi";
import { toast } from "react-toastify";
import EditAccountPopup from "../edit_account_popup/EditAccountPopup";
import ConfirmAlert from "../confirm_alert/ConfirmAlert";

export const Table = props => {
  const {data, ...others} = props;
  const handleDeleteAccount = (userId) => {
    others.handleDeleteAccount(userId);
  }
  const handleEditClick = (user) => {
    others.handleEditClick(user);
  }
    return (
      <div className={styles.account_table}>
        <div className={styles.table_header}>
            <div className={styles.header_item}>ID</div>
            <div className={styles.header_item}>First Name</div>
            <div className={styles.header_item}>Last Name</div>
            <div className={styles.header_item}>Email</div>
            <div className={styles.header_item}>Avartar</div>
            <div className={styles.header_item}>Created Date</div>
            <div className={styles.header_item}>Modified Date</div>
            <div className={styles.header_item}/>
            <div className={styles.header_item}/>
        </div>
        <div className={styles.table_body}>
          {data?.map((item, index) => (
            <div className={styles.body_row} key={item.id}>
              <div className={styles.row_item}>{item.id}</div>
              <div className={styles.row_item}>{item.first_name}</div>
              <div className={styles.row_item}>{item.last_name}</div>
              <div className={styles.row_item}>{item.email}</div>
              <div className={styles.row_item}>{item.url_avatar}</div>
              <div className={styles.row_item}>{item.date_created}</div>
              <div className={styles.row_item}>{item.date_modified}</div>
              <div className={styles.row_item}>
                <button onClick={() => handleDeleteAccount(data[index].id)} className={styles.delete_button}>Delete</button>
              </div>
              <div className={styles.row_item}>
                <button onClick={() => handleEditClick(data[index])}>Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

const AccountManagerment = props =>{
    const [userDatas, setUserDatas]=useState([]);
    useEffect( () => {
        const fetchUserDatas = async () =>{
            const response = await adminApi.getAllUserAccount();
            if(response.status)
                setUserDatas(response.data);
            else
                toast.error(response.message);
        }
        fetchUserDatas();
    },[]);
    const [currentUser, setCurrentUser] = useState(null);
    const [isEditClick, setIsEditClick] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [isDisplayAlert, setIsDisplayAlert] = useState(false);
    const handleDeleteAccount = (userId) =>
    {
      setDeleteUserId(userId);
      setIsDisplayAlert(!isDisplayAlert);
    }
    const handleDeleteAccountAlert = async () => 
    {
        const response = await adminApi.deleteAccount(deleteUserId);

        if(response.status)
        {
            setIsDisplayAlert(!isDisplayAlert);
            setUserDatas(userDatas.filter(userData => userData.id !== deleteUserId));
        }
        else
            toast.error(response.message);
    }
    const handleEditClick = (user) => {
      setCurrentUser(user);
      setIsEditClick(true);
    }
    useEffect( () => {
      if(currentUser !== null && currentUser !== undefined && userDatas !== null && userDatas !== undefined && userDatas.length !== 0)
      {
        userDatas[userDatas.indexOf(userDatas.filter(user => user.id === currentUser.id)[0])] = currentUser;
        setUserDatas([...userDatas])
      }
      // eslint-disable-next-line
    }, [currentUser])
    return (
      <>
        <div className={styles.account_managerment_container}>
            <Table data={userDatas} handleDeleteAccount={handleDeleteAccount} handleEditClick={handleEditClick}/>
            {
              isEditClick && <EditAccountPopup userData={currentUser} setCurrentUser={setCurrentUser} setIsEditClick={setIsEditClick}/>
            }
            {
              isDisplayAlert && <ConfirmAlert cancelFunc={setIsDisplayAlert} okFunc={handleDeleteAccountAlert} title={`Would you like to delete ${deleteUserId} account`}/>
            }
        </div>
        
      </>
        
    );
}

export default AccountManagerment;