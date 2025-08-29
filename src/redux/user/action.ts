import axios from "axios";
import { toast } from "react-toastify";
import { 
  LOADING,
  LOGIN,
  REGISTER,
 } from "../common/constant";
 
import { URL } from "../common/url";
import api from "./../common/api";
const loading = (data:any) => {
  return { type: LOADING, payload: data };
};
const loginAction = (data:any) => {
  return { type: LOGIN, payload: data };
};
const registerAction = (data:any) => {
  return { type: REGISTER, payload: data };
};

export const login = (data:any, history:any) => {
  return async (dispatch:any) => {
    try {
      dispatch(loading(true));
      const response:any = await api.post(`${URL.login}`, data);
          dispatch(loginAction(response.data?.data));
          dispatch(loading(false));
          localStorage.setItem("token", response?.data?.token);
          localStorage.setItem("user", JSON.stringify(response.data?.data));
         // history.push("/chat");
          toast.success(response?.data?.message);
    }
    catch(error:any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};

export const register = (data:any, history:any) => {
  return async (dispatch:any) => {
    dispatch(loading(true));
    try {
      const response:any = await api.post(`${URL.createUser}`, data);
          dispatch(registerAction(response.data?.data));
          dispatch(loading(false));
         // history.push("/login");
          toast.success(response?.data?.message);
    } catch (error:any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};