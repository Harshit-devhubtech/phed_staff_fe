import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../common/url";
import api from "./../common/api";
import { 
  LOADING,
  GET_UNIVERSITIES_LIST,
  GET_UNIVERSITIES_BY_ID,
  GET_UNIVERSITIES,
  GET_ALL_UNIVERSITIES_COMMENT,
  ADD_UNIVERSITIES_COMMENT,
  GET_RANKING_UNIVERSITIES,
  GET_UNIVERSITIES_BY_SLUG,
 } from "../common/constant";

const loading = (data:any) => {
  return { type: LOADING, payload: data };
};
const getAllUniversityListAction = (data:any) => {
  return { type: GET_UNIVERSITIES_LIST, payload: data };
};

const getUniversityByIdAction = (data:any) => {
  return { type: GET_UNIVERSITIES_BY_ID, payload: data };
};
const getuniversitiesAction = (data:any) => {
  return { type: GET_UNIVERSITIES, payload: data };
};
const getAllUniversitiesCommentAction = (data:any) => {
  return { type: GET_ALL_UNIVERSITIES_COMMENT, payload: data };
};
const addUniversityCommentAction = (data:any) => {
  return { type: ADD_UNIVERSITIES_COMMENT, payload: data };
};
const getrankinguniversitiesAction = (data:any) => {
  return { type: GET_RANKING_UNIVERSITIES, payload: data };
};const
fineUniversityBySlugAction = (data:any) => {
  return { type: GET_UNIVERSITIES_BY_SLUG, payload: data };
};


export const getAllUniversity = (data:any) => {
  return async (dispatch:any) => {
    try {
      dispatch(loading(true));
      const response:any = await api.get(`${URL.getAllUniversity}`);
          dispatch(getAllUniversityListAction(response?.data?.data));
          dispatch(loading(false));
    }
    catch(error:any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};

export const getAllUniversitiesComment = (data:any) => {
  return async (dispatch:any) => {
    try {
      dispatch(loading(true));
      const response:any = await api.post(`${URL.getAllUniversitiesComment}`,data);
          dispatch(getAllUniversitiesCommentAction(response?.data?.data));
          dispatch(loading(false));
    }
    catch(error:any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};
export const getrankinguniversities = (data:any) => {
  return async (dispatch:any) => {
    try {
      dispatch(loading(true));
      const response:any = await api.post(`${URL.getrankinguniversities}`,data);
          dispatch(getrankinguniversitiesAction(response?.data?.data));
          dispatch(loading(false));
    }
    catch(error:any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};




export const addUniversityComment = (data:any) => {
  return async (dispatch:any) => {
    try {
      dispatch(loading(true));
      const response:any = await api.post(`${URL.addUniversityComment}`,data);
          dispatch(addUniversityCommentAction(response?.data?.data));
          dispatch(loading(false));
    }
    catch(error:any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};

export const getuniversities = (data:any) => {
  return async (dispatch:any) => {
    try {
      // dispatch(loading(true));
      const response:any = await api.post(`${URL.getuniversities}`,data);
          dispatch(getuniversitiesAction(response?.data?.data));
          // dispatch(loading(false));
    }
    catch(error:any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};

export const getUniversityById = (data:any) => {
  return async (dispatch:any) => {
    try {
    
      dispatch(loading(true));
      const response:any = await api.get(`${URL.getUniversityById}?id=${data}`);
          dispatch(getUniversityByIdAction(response?.data?.data));
          dispatch(loading(false));
    }
    catch(error:any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};
export const getUniversityBySlug = (data:any) => {
  return async (dispatch:any) => {
    try {
    
      dispatch(loading(true));
      const response:any = await api.get(`${URL.fineUniversityBySlug}?slug=${data}`);
          dispatch(fineUniversityBySlugAction(response?.data?.data));
          dispatch(loading(false));
    }
    catch(error:any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};