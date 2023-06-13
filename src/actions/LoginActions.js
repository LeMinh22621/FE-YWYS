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
          if(response.status && response.return_code === 200)
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
      }
      catch (error) {
        if(error.return_code === 401)
        {
          removeToken();
          const newResponse = await authApi.login({email, password});
          console.log(newResponse);
          if(newResponse.status && newResponse.return_code === 200)
          {
            const token = newResponse.data.token;
            const user = newResponse.data.user;

            setToken(token);
            dispatch({ type: LOGIN_SUCCESS, payload: user});
            toast.success(newResponse.message);
          }
          else{
            dispatch({ type: LOGIN_FAILURE, payload: error.message });
            toast.error(newResponse.message);
          }
        }
        else{
          dispatch({ type: LOGIN_FAILURE, payload: error.message });
          toast.error(error.message);
        }
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