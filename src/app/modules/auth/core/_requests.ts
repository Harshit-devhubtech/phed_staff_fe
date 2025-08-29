import axios from 'axios'
import { URL } from '../../../../redux/common/url'
import { useAuth } from './Auth'
import {AuthModel, UserModel} from './_models'

const API_URL = URL.API_BASE_URL

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/api/`
// export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/api/admins/verify_profile`
export const LOGIN_URL = `${API_URL}/api/loginProfile`
export const REGISTER_URL = `${API_URL}/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`

// Server should return AuthModel
type RoleIdType = string | number;
export function login(user_name: string, password: string , role_id:RoleIdType) {


  return axios.post<AuthModel>(LOGIN_URL, {
    user_name,
    password,
    role_id,
  })
}

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {
    email,
  })
}

export function getUserByToken(token: string) {

  const lsValue:any = localStorage.getItem("kt-auth-react-v")
  
  const usData:any= JSON.parse(lsValue)


  return axios.get<UserModel>(GET_USER_BY_ACCESSTOKEN_URL+usData?.data?.prefix+"/verify_profile", {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}
