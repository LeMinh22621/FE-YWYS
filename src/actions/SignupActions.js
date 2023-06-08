import  authApi from '../api/authApi';
import { toast } from "react-toastify";
import { TOKEN_KEY } from '../utils/auth';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const SignupRequest = (userData) => {
    return async (dispatch) => {
        dispatch({type: SIGNUP_REQUEST});
        try {
            const response = await authApi.register(userData);
            if(response.status)
            {
              const token = response.data.token;
              const user = response.data.user;

              localStorage.setItem(TOKEN_KEY, token);
              dispatch({ type: SIGNUP_SUCCESS, payload: user});
              toast.success(response.message);
            }
            else
            {
              dispatch({ type: SIGNUP_FAILURE, payload: response.message });
              toast.error(response.message);
            }
            
            // Có thể thực hiện các hành động khác sau khi đăng ký thành công, như chuyển hướng trang.
        }
        catch (error) {
            dispatch({ type: SIGNUP_FAILURE, payload: error });
            // Có thể xử lý các lỗi hoặc hiển thị thông báo lỗi cho người dùng.
            toast.error("Sign up Failed!");
        }
    };
  };
  
  export const signupSuccess = (user) => ({
    type: SIGNUP_SUCCESS,
    payload: user
  });
  
  export const signupFailure = (error) => ({
    type: SIGNUP_FAILURE,
    payload: error
  });