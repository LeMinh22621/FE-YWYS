import React, { useEffect } from "react";
import styles from "./MotivationalQuoteManagerment.module.css";
import { useState } from "react";
import adminApi from "../../api/adminApi";
import { toast } from "react-toastify";
import MotivationalQuoteDetail from "../motivational_quote_detail/MotivationalQuoteDetail";
import ConfirmAlert from "../confirm_alert/ConfirmAlert";

const MotiovationalQuoteTable = props => {
    const {data, ...others} = props;
    const [activeRow, setActiveRow] = useState(0);
    // add motivational Quote
    const [isAddQuoteClick, setIsAddQuoteClick] = useState(false);
    const handleAddAlertClick = async (newContent, newAuthor) => {
     
      const newMotivationalQuote = {
        'content': newContent,
        'author': newAuthor
      }
      const response = await adminApi.addNewMotivationalQuote(newMotivationalQuote);
      console.log(response);
      if(response.status)
      {
        others.setDatas([...data, response.data]);
        setIsAddQuoteClick(!isAddQuoteClick)
      }
      else{
        toast.error(response.message);
      }
    }
    // delete motivation quote
    const [isDeleteQuoteClick, setIsDeleteQuoteClick] = useState(false);
    const [deleteQuoteId, setDeleteQuoteId] = useState('');
    const handleDeleteButtonClick = (quoteId) =>{
      setIsDeleteQuoteClick(!isDeleteQuoteClick);
      setDeleteQuoteId(quoteId);
    }
    const handleDeleteOnAlert = async () =>{
      const resposne = await adminApi.deletQuoteById(deleteQuoteId);
      console.log(resposne);
      if(resposne.status)
      {
        others.setDatas(data.filter(quote => quote.motivationalQuoteId !== deleteQuoteId));
        setIsDeleteQuoteClick(false);
      }
      else
        toast.error(resposne.message);
    }
    // edit motivational quote
    const [isEditQuoteClick, setIsEditQuoteClick]  = useState(false);
    const [editQuoteData, setEditQuoteData] = useState(null);
    const handleEditButtonClick = (motivationalQuote) => {
      setIsEditQuoteClick(!isEditQuoteClick);
      setEditQuoteData(motivationalQuote);
    }
    const handleOKAlert = async (newContent, newAuthor) =>{
      const newQuoteData = {...editQuoteData, 
        'content': newContent,
        'author': newAuthor
      }
      const response = await adminApi.updateMotivationalQuote(editQuoteData.motivationalQuoteId, newQuoteData); 
      console.log(response);
      if(response.status)
      {
        setIsEditQuoteClick(!isEditQuoteClick);
        const editQuote = data[data.indexOf(data.filter(quote => quote.motivationalQuoteId === editQuoteData.motivationalQuoteId)[0])];
        editQuote.content = newContent;
        editQuote.author = newAuthor;

        others.setDatas([...data]);
      }
      else
        toast.error(response.message);
    }
    return (
      <div className={styles.table}>
        <div className={styles.table_header}>
          <div className={styles.header_item}>ID</div>
          <div className={styles.header_item}>Content</div>
          <div className={styles.header_item}>Author</div>
          <div className={styles.header_item}>
            <button className={styles.add_button} onClick={() => setIsAddQuoteClick(!isAddQuoteClick)}>Add</button>
          </div>
        </div>
        <div className={styles.table_body}>
          {data?.map((item, index) => (
            <div className={index === activeRow ? `${styles.body_row} ${styles.body_row_active}` : styles.body_row} key={item.motivationalQuoteId} onClick={() => setActiveRow(index) }>
              <div className={`${styles.row_item} ${styles.row_item_id}`}>{item.motivationalQuoteId}</div>
              <div className={styles.row_item}>{item.content}</div>
              <div className={styles.row_item}>{item.author}</div>
              <div className={styles.row_item}>
                <button className={styles.delete_button} onClick={() => handleDeleteButtonClick(data[index].motivationalQuoteId)}>Delete</button>
                <button onClick={() => handleEditButtonClick(data[index])}>Edit</button>
              </div>
            </div>
          ))}
        </div>
        {
          isAddQuoteClick && <MotivationalQuoteDetail okFunc={handleAddAlertClick} title={"New Motivational Quote"} cancelFunc={setIsAddQuoteClick}/>
        }
        {
          isDeleteQuoteClick && <ConfirmAlert title={`Would you like to delete ${deleteQuoteId}`} cancelFunc={setIsDeleteQuoteClick} okFunc = {handleDeleteOnAlert}/>
        }
        {
          isEditQuoteClick && <MotivationalQuoteDetail quoteData={editQuoteData} title={"Edit Motivational Quote"} okFunc={handleOKAlert} cancelFunc={setIsEditQuoteClick}/>
        }
      </div>
  );
}


const MotivationalQuoteManagerment = props => {

  const [motivationalQuoteDatas, setMotivationalQuoteDatas] = useState([]);
  useEffect( () => {
    const fetchMotivationalQuotes = async () => {
      const response = await adminApi.getAllMotivationalQuotes();
      console.log(response);
      if(response.status)
      {
        setMotivationalQuoteDatas(response.data);
      }
      else
        toast.error(response.message);
    }
    fetchMotivationalQuotes();
  }, []);

  return (
    <div className={styles.motivational_quote_container}>
      <h1>Motivational Quote</h1>
      <MotiovationalQuoteTable data={motivationalQuoteDatas} setDatas={setMotivationalQuoteDatas}/>
    </div>
  );
}

export default MotivationalQuoteManagerment;