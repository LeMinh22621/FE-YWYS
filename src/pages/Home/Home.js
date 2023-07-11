import React, { useState } from 'react';
import styles from './Home.module.css';
import { AiFillHome } from 'react-icons/ai';
import RoomItem from '../../components/room_item/RoomItem';
import { useDispatch, useSelector } from 'react-redux';
import roomApi from "../../api/roomApi";
import authApi from "../../api/authApi";
import { TOKEN_KEY } from '../../utils/auth';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../actions/LoginActions';
import * as FaIcons from 'react-icons/fa';
import NewRoomForm from '../../components/new_room_form/NewRoomForm';
import DetailUser from '../../components/detail_user/DetailUser';

const Home = props => {
  const loggedIn = useSelector((state) => state.login);
  const [publicUserId, setPublicUserId] = useState([]);
  const [urls, setUrls] = useState([]);
  const [user, setUser] = useState(loggedIn.user);
  const [myRoomList, setMyRoomList] = useState([]);
  const [publicRooms, setPublicRooms] = useState([]);
  const [isAvatarClick, setIsAvatarClick] = useState(false);
  const [isAddRoomClick, setIsAddRoomClick] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // fetch Data by token
  useEffect( () => {
    /**
     * 
     * Fetch User
     */
    const fetchUser = async () => {
      try{
        const token = localStorage.getItem(TOKEN_KEY);
        const response = await authApi.checkExpiredToken(token);
        console.log(response.data)
        setUser(response.data);
      }
      catch(err)
      {
        toast.error(err);
      }
    }
    if(user == null)
      fetchUser();
    /**
     * 
     * Fetch My Room List
     */
    const fetchMyRoomList = async (setMyRoomList) =>{
      try{
        const userId = user.id;
        const response = await roomApi.getMyRoomList(userId);
        setMyRoomList(response.data);
      }
      catch(err)
      {
        toast.error(err);
      }
    }
    fetchMyRoomList(setMyRoomList);
    /**
     * 
     * Fetch public Rooms
     */
    const fetchPubicRooms = async () =>{
      if(user === undefined || user === null)
        return;
      try{
        const response = await roomApi.getPublichRoomOrderByMembers();
        console.log(response);
        setPublicUserId(response.data.map(
          room => room.user_id
        ).reverse());

        setPublicRooms(response.data.reverse());
      }
      catch(err)
      {
        toast.error(err);
      }
    }
    fetchPubicRooms(setPublicRooms);
    // eslint-disable-next-line
  }, [user]);

  const handleLogout = async () =>{
    try{
      dispatch(logout());
      navigate("/login", {replace:true});
    }
    catch (err) {
      toast.error(err);
    }
  }

  // handle Detail user
  const [isShowDetailUser, setIsShowDetailUser] = useState(false);
  const handleShowUserDetail = () => {
    setIsShowDetailUser(!isShowDetailUser);
  }
  useEffect( () => {
    const getUserAvatar = async () => {
      console.log(publicUserId)
      const response = await roomApi.getUserAvatar(JSON.stringify(publicUserId));

      if(response.return_code === 200)
      {
        console.log(response.data);
        setUrls(response.data);
      }
    }
    getUserAvatar();
  }, [publicUserId]);
  return (
    <div className={styles.home_page_container}>
      <div className={styles.home_page_container_wrapper}>
        <div className={styles.header_container}>
          <div className={styles.header_container_wrapper}>
            <a className={styles.home_icon_container} href='/'>
              <AiFillHome className={styles.home_icon}/>
            </a>
            <div className={styles.profile_infor}>
              <span>{user?.first_name + " " + user?.last_name}</span>
              <button onClick={() => setIsAvatarClick(!isAvatarClick)} className={styles.avatar_container}>
                <div className={styles.avatar_container_wrapper} style={{backgroundImage: `url(${user?.url_avatar})`}}/>
                {
                  isAvatarClick && (
                    <div className={styles.avatar_menu}>
                      <span onClick={handleShowUserDetail}>Profile</span>
                      <span onClick={handleLogout}>Logout</span>
                    </div>
                  )
                }
              </button>
            </div>
          </div>
        </div>
        <div className={styles.body_container}>
          <div className={styles.body_container_wrapper}>
            <div className={styles.my_room_list_header}>
              <h1>My Room</h1>
              <div className={styles.add_my_room_list_icon}>
                <FaIcons.FaPlusCircle onClick={() => setIsAddRoomClick(!isAddRoomClick)}/>
              </div>
              {
                isAddRoomClick && <NewRoomForm closeNewRoomForm = {() => setIsAddRoomClick(!isAddRoomClick)}/>
              }
            </div>
              <div className={styles.my_room_list_container}>
                {
                  myRoomList?.map((roomItem) => <RoomItem isPublicRoomItem={false} key={roomItem?.room_id} myRoomList={myRoomList} setMyRoomList={setMyRoomList} roomId={roomItem?.room_id} avatar={user?.url_avatar} title={roomItem?.title} description={roomItem?.description} members={roomItem?.members} backgroundImage={roomItem.background.image_link}/>)
                }
              </div>
              <h1>Public Room</h1>
              <div className={styles.my_room_list_container}>
                {
                  publicRooms?.map((roomItem, index) => {
                    return <RoomItem 
                    isPublicRoomItem={true}
                    key={roomItem?.room_id}
                    myRoomList={myRoomList} 
                    setMyRoomList={setMyRoomList} 
                    roomId={roomItem?.room_id} 
                    avatar={urls[index]?.url_avatar} 
                    title={roomItem?.title} 
                    description={roomItem?.description}
                    members={roomItem?.members}
                    backgroundImage={roomItem.background.image_link}/>
                })
                }
              </div>
          </div>
        </div>
      </div>
      {
        isShowDetailUser && <DetailUser userData = {user} cancelFunc = {setIsShowDetailUser}/>
      }
    </div>
  );
}

export default Home;