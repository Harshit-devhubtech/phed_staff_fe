import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { getAuthb } from '../../app/modules/auth';
import { URL } from './url';

const auth:any = getAuthb()
let Api:AxiosInstance = axios.create({
    baseURL: URL.API_BASE_URL,
//   data,
    headers: localStorage.getItem('kt-auth-react-v') ? {'Authorization': `Bearer ${auth.api_token}`} : undefined
  });
  
Api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error:AxiosError) => {
        console.log(error?.response?.status)
        // Do something with response error
        return Promise.reject(error);
    }
);
export default Api;