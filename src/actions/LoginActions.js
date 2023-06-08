import { toast } from "react-toastify";
import authApi from "../api/authApi";
import { removeToken, setToken } from "../utils/auth";
// types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const loginRequest = (email, password) => {
  return async (dispatch) => {
    dispatch({type: LOGIN_REQUEST});
    try {
          const response = await authApi.login({email, password});
          console.log(response);
          if(response.status)
          {
            const token = response.data.token;
            const user = response.data.user;

            setToken(token);
            dispatch({ type: LOGIN_SUCCESS, payload: user});
            toast.success(response.message);
          }
          else
          {
            dispatch({ type: LOGIN_FAILURE, payload: response.message });
            toast.error(response.message);
          }
          
          // Có thể thực hiện các hành động khác sau khi đăng ký thành công, như chuyển hướng trang.
      }
      catch (error) {
          dispatch({ type: LOGIN_FAILURE, payload: error });
          // Có thể xử lý các lỗi hoặc hiển thị thông báo lỗi cho người dùng.
          toast.error(LOGIN_FAILURE);
      }
  };
};

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error
});

export const logout = () => {
  return async (dispatch) => {
    dispatch({type: LOGOUT});
    const response = await authApi.logout();
    console.log(response);
    if(response.status)
    {
      removeToken();
      toast.success(response.message);
    }
    else{
      toast.error(response.message);
    }
  };
};
  
  