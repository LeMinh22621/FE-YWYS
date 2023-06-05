import  authApi from '../api/authApi';
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const SignupRequest = (userData) => {
  const navigate = useNavigate();
  // location
  const location = useLocation();
  const from = location.state?.from?.pathname || "/login";
    return async (dispatch) => {
        dispatch({type: SIGNUP_REQUEST});
        try {
            const response = await authApi.register(userData);
            console.log(response);
            dispatch({ type: SIGNUP_SUCCESS });
            // Có thể thực hiện các hành động khác sau khi đăng ký thành công, như chuyển hướng trang.
            navigate(from, {replace:true})
        }
        catch (error) {
            dispatch({ type: SIGNUP_FAILURE, payload: error });
            // Có thể xử lý các lỗi hoặc hiển thị thông báo lỗi cho người dùng.
            toast.error("Password doesn't match!");
        }
    };
  };
  
  export const signupSuccess = () => ({
    type: SIGNUP_SUCCESS,
  });
  
  export const signupFailure = (error) => ({
    type: SIGNUP_FAILURE,
    payload: error,
  });