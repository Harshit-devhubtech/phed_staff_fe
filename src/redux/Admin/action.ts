import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../common/url";
import api from "./../common/api";
import {
  LOADING,

  GET_PERMISSION_LISTS,
  GET_ROLES_LISTS,
  GET_RATE_LISTS,
  GET_CIRCLE_LISTS,
  GET_USERS_LISTS,
  GET_USERS_DETAILS,
  GET_ALL_CRICLE,
  PROFILE_LIST,
  ROLES_LIST,
  VEHICLE_LIST,
  VEHICLE_DETAILS,
  CERCLE_LIST,
  STATION_LIST,
  STATION_DETAILS,
  ASSIGN_DRIVER,
  DESTINATION_DETAILS,
  GET_USER_FOR_LOGIN,
  GET_ALL_BOOKING,
  VEHICLE_LIST_VENDOR,
  GET_USER_PROFILE,
  GET_DASHBOARD,
  GET_ALL_REPORT,

} from "../common/constant";

const loading = (data: any) => {
  return { type: LOADING, payload: data };
};

const getperListAction = (data: any) => {
  return { type: GET_PERMISSION_LISTS, payload: data };
};
const getrateListAction = (data: any) => {
  return { type: GET_RATE_LISTS, payload: data };
};
const getroleListAction = (data: any) => {
  return { type: GET_ROLES_LISTS, payload: data };
};
const getcircleListAction = (data: any) => {
  return { type: GET_CIRCLE_LISTS, payload: data };
};
const getusersListAction = (data: any) => {
  return { type: GET_USERS_LISTS, payload: data };
};
const getusersDetailsAction = (data: any) => {
  return { type: GET_USERS_DETAILS, payload: data };
};
const getallcricleAction = (data: any) => {
  return { type: GET_ALL_CRICLE, payload: data };
};
const getProfileListAction = (data: any) => {
  return { type: PROFILE_LIST, payload: data };
};
const getuserforloginAction = (data: any) => {
  return { type: GET_USER_FOR_LOGIN, payload: data };
};
const getRoleListAction = (data: any) => {
  return { type: ROLES_LIST, payload: data };
};

const getVehivleDetailsAction = (data: any) => {
  return { type: VEHICLE_DETAILS, payload: data };
};

const getCrealeLsitAction = (data: any) => {
  return { type: CERCLE_LIST, payload: data };
};



const getStationLsitAction = (data: any) => {
  return { type: STATION_LIST, payload: data };
};
const getStationDetailsAction = (data: any) => {
  return { type: STATION_DETAILS, payload: data };
};

const destinationDetailsAction = (data: any) => {
  return { type: DESTINATION_DETAILS, payload: data };
};
const getAllbookingsAction = (data: any) => {
  return { type: GET_ALL_BOOKING, payload: data };
};
const getAllReportsAction = (data: any) => {
  return { type: GET_ALL_REPORT, payload: data };
};



// const
// fineUniversityBySlugAction = (data:any) => {
//   return { type: GET_UNIVERSITIES_BY_SLUG, payload: data };
// };


const getVehivleListAction = (data: any) => {
  return { type: VEHICLE_LIST, payload: data };
};
const getdashboardAction = (data: any) => {
  return { type: GET_DASHBOARD, payload: data };
};

const getVehivlevendorListAction = (data: any) => {
  return { type: VEHICLE_LIST_VENDOR, payload: data };
};

const assignDriverAction = (data: any) => {
  return { type: ASSIGN_DRIVER, payload: data };
};
const getuserProdileAction = (data: any) => {
  return { type: GET_USER_PROFILE, payload: data };
};



export const userprofile = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");




      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      dispatch(loading(true));
      const response: any = await api.get(`${prfix + URL.userprofile}?page=${data}`, config);
      dispatch(getuserProdileAction(response?.data?.data));
      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};

export const all_filling_stations = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");




      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      dispatch(loading(true));
      const response: any = await api.get(`${prfix + URL.all_filling_stations}?page=${data.page}${data?.search ? "&search=" + data?.search : ""}`, config);
      dispatch(getStationLsitAction(response?.data?.data));
      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};

export const geBookingsByStatus = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");




      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };


      console.log(JSON.parse(token));

      const allDetails = JSON.parse(token)

      const pro = allDetails?.data?.prefix
      const proId = allDetails?.data?.id

      const witch = "&status=" + data?.status

      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      dispatch(loading(true));
      const response: any = await api.get(`${prfix + URL.geBookingsByStatus}?page=${data?.page + witch}`, config);
      dispatch(getAllbookingsAction(response?.data?.data));
      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};

export const getCompleteBookings = (query: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");
      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      console.log(JSON.parse(token));

      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`;
      dispatch(loading(true));
      const response: any = await api.get(`${prfix + URL.getCompleteBookings}?${query}`, config);
      dispatch(getAllbookingsAction(response?.data?.data));
      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    };
  };
};

export const getCancelBookings = (query: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");
      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      dispatch(loading(true));
      const response: any = await api.get(`${prfix + URL.getCancelBookings}?${query}`, config);
      dispatch(getAllbookingsAction(response?.data?.data));
      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};

export const getScheduleBookings = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");

      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      const allDetails = JSON.parse(token)

      const pro = allDetails?.data?.prefix
      const proId = allDetails?.data?.id
      const croId = allDetails?.data?.circle_id

      const witch = pro == "jens" ? "&jen_id=" + proId : pro == "cas" ? "&circle_id=" + croId : "&aen_id=" + proId

      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      dispatch(loading(true));
      const response: any = await api.get(`${prfix + URL.getScheduleBookings}?page=${data + witch}`, config);
      dispatch(getAllbookingsAction(response?.data?.data));
      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};

export const updateScheduleBooking = (data: any, pageNo: any, type: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");

      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      dispatch(loading(true));
      const response: any = await api.post(`${prfix + URL.updateScheduleBooking}`, data);

      if (response?.data?.status == true) {
        toast.success(response?.data?.message)
        const allDetails = JSON.parse(token)

        const pro = allDetails?.data?.prefix
        const proId = allDetails?.data?.id
        const croId = allDetails?.data?.circle_id
        const witch = pro == "jens" ? "&jen_id=" + proId : pro == "cas" ? "&circle_id=" + croId : "&aen_id=" + proId

        const urlb: any = type == "cu" ? URL.getScheduleBookings : type == "can" ? URL.getCancelBookings : URL.getCompleteBookings
        const responseget: any = await api.get(`${prfix + urlb}?page=${pageNo + witch}`, config);
        // dispatch(getroleListAction(response?.data?.data));
        dispatch(getAllbookingsAction(responseget?.data?.data));
      } else {
        toast.error(response?.data?.message)
      }


      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};
export const createScheduleBooking = (data: any, navigete: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");

      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      dispatch(loading(true));
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      const response: any = await api.post(`${prfix + URL.createScheduleBooking}`, data);

      if (response?.data?.status == true) {
        toast.success(response?.data?.message)

        navigete("/dashboard")
        // const responseget:any = await api.get(`${prfix+URL.get_user_destination}?page=${pageNo}`,config );
        // dispatch(getroleListAction(response?.data?.data));
        // dispatch(destinationDetailsAction(responseget?.data?.data));
      } else {
        toast.error(response?.data?.message)
      }


      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};
export const deleteScheduleBooking = (data: any, pageNo: any) => {
  console.log("pageNo ==> ", pageNo);
  console.log("data ==> ", data);
  // return;
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");

      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      const allDetails = JSON.parse(token)
      const pro = allDetails?.data?.prefix
      const proId = allDetails?.data?.id
      const croId = allDetails?.data?.circle_id
      const witch = pro == "jens" ? "&jen_id=" + proId : pro == "cas" ? "&circle_id=" + croId : "&aen_id=" + proId

      dispatch(loading(true));
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      const response: any = await api.post(`${prfix + URL.delete_schedule_booking}`, { id: data });

      if (response?.data?.status == true) {
        toast.success(response?.data?.message)

        const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
        dispatch(loading(true));
        const res: any = await api.get(`${prfix + URL.getScheduleBookings}?page=${pageNo + witch}`, config);
        dispatch(getAllbookingsAction(res?.data?.data));
        dispatch(loading(false));
      } else {
        toast.error(response?.data?.message)
      }
      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};

export const getCurrentBookings = (query: any) => {
  console.log(query)
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");

      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      console.log(JSON.parse(token));

      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      dispatch(loading(true));

      const response: any = await api.get(`${prfix + URL.getCurrentBookings}?${query}`, config);
      dispatch(getAllbookingsAction(response?.data?.data));
      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};
export const getReports = (data: any, status: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");

      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      const allDetails = JSON.parse(token)

      const pro = allDetails?.data?.prefix
      const proId = allDetails?.data?.id

      const witch = pro == "jens" ? "&jen_id=" + proId : "&aen_id=" + proId

      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      dispatch(loading(true));
      const response: any = await api.get(`${prfix + URL.getReports}?page=${data +
        witch}&approved=${status ? status : "pending"}`, config);
      dispatch(getAllReportsAction(response?.data?.data));
      dispatch(loading(false));
    }

    // approved=pending
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};
export const getReportsFilter = (data: any, Filter: any, status: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");

      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      const allDetails = JSON.parse(token)

      const pro = allDetails?.data?.prefix
      const proId = allDetails?.data?.id

      const witch = pro == "jens" ? "&jen_id=" + proId : "&aen_id=" + proId

      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      dispatch(loading(true));
      const response: any = await api.get(`${prfix + URL.getReports}?page=${data +
        witch}&approved=${status ? status : "pending"}&${Filter}`, config);
      dispatch(getAllReportsAction(response?.data?.data));
      dispatch(loading(false));
    }

    // approved=pending
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};
export const getAllBookings = (data: any) => {
  console.log("data ==> ", data);
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");

      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };

      const allDetails = JSON.parse(token)
      console.log("allDetails ==> ", allDetails);

      const pro = allDetails?.data?.prefix
      const proId = allDetails?.data?.id
      console.log("proId ==> ", proId);

      const witch = pro == "jens" ? "&jen_id=" + proId : "&aen_id=" + proId
      console.log("witch ==> ", witch);

      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      dispatch(loading(true));
      const response: any = await api.get(`${prfix + URL.getAllBookings}?page=${data + witch}`, config);
      dispatch(getAllbookingsAction(response?.data?.data));
      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};
export const getAllBookingsuserview = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");

      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };

      const allDetails = JSON.parse(token)

      const pro = allDetails?.data?.prefix
      const proId = allDetails?.data?.id

      const witch = pro == "jens" ? "&jen_id=" + proId : "&aen_id=" + proId

      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      dispatch(loading(true));
      const response: any = await api.get(`${prfix + URL.getAllBookings}?page=${data?.page}&user_id=${data?.user_id}`, config);
      // dispatch(getAllbookingsAction(response?.data?.data));
      dispatch(loading(false));

      return response?.data
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
      return error?.response?.data
    }
  };
};

export const updateBooking = (data: any, pageNo: any, type: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");




      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      dispatch(loading(true));
      const response: any = await api.post(`${prfix + URL.updateBooking}`, data);

      if (response?.data?.status == true) {
        toast.success(response?.data?.message)
        const allDetails = JSON.parse(token)

        const pro = allDetails?.data?.prefix
        const proId = allDetails?.data?.id
        const croId = allDetails?.data?.circle_id
        const witch = pro == "jens" ? "&jen_id=" + proId : pro == "cas" ? "&circle_id=" + croId : "&aen_id=" + proId

        const urlb: any = type == "cu" ? URL.getCurrentBookings : type == "can" ? URL.getCancelBookings : URL.getCompleteBookings
        const responseget: any = await api.get(`${prfix + urlb}?page=${pageNo + witch}`, config);
        // dispatch(getroleListAction(response?.data?.data));
        dispatch(getAllbookingsAction(responseget?.data?.data));
      } else {
        toast.error(response?.data?.message)
      }


      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};
export const assign_manager_station = (data: any, pageNo: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");




      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      dispatch(loading(true));
      const response: any = await api.post(`${prfix + URL.assign_manager_station}`, data);

      if (response?.data?.status == true) {
        toast.success(response?.data?.message)
        // const responseget: any = await api.get(`${prfix + URL.all_filling_stations}?page=${pageNo}`, config);
        // // dispatch(getroleListAction(response?.data?.data));
        // dispatch(getStationLsitAction(responseget?.data?.data));
      } else {
        toast.error(response?.data?.message)
      }


      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};


export const fillingStationDetails = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");




      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      dispatch(loading(true));
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      const response: any = await api.post(`${prfix + URL.fillingStationDetails}`, data);

      if (response?.data?.status == true) {
        // toast.success(response?.data?.message)
        // const responseget:any = await api.get(`${URL.all_vehicles}?page=${pageNo}`,config );
        // dispatch(getroleListAction(response?.data?.data));
        dispatch(getStationDetailsAction(response?.data?.data));
      } else {
        toast.error(response?.data?.message)
      }


      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};


export const delete_filling_station = (data: any, pageNo: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");




      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      dispatch(loading(true));
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      const response: any = await api.post(`${prfix + URL.delete_filling_station}`, data);

      if (response?.data?.status == true) {
        toast.success(response?.data?.message)
        // const responseget: any = await api.get(`${prfix + URL.all_filling_stations}?page=${pageNo}`, config);
        // // dispatch(getroleListAction(response?.data?.data));
        // dispatch(getStationLsitAction(responseget?.data?.data));
      } else {
        toast.error(response?.data?.message)
      }


      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};


export const add_station = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");




      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      dispatch(loading(true));
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      const response: any = await api.post(`${prfix + URL.add_station}`, data);

      if (response?.data?.status == true) {
        toast.success(response?.data?.message)
        const responseget: any = await api.get(`${prfix + URL.all_filling_stations}?page=1`, config);
        // dispatch(getroleListAction(response?.data?.data));
        dispatch(getStationLsitAction(responseget?.data?.data));
      } else {
        toast.error(response?.data?.message)
      }


      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};




export const all_vehicles_vendor = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");
      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };




      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`

      dispatch(loading(true));
      const response: any = await api.get(`${prfix + URL.all_vehicles_vendor}?page=${data.page}${data?.search ? '&search=' + data?.search : ''}`, config);
      dispatch(getVehivlevendorListAction(response?.data?.data));
      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};

export const dashboard = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");
      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };




      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`

      dispatch(loading(true));
      const response: any = await api.get(`${prfix + URL.dashboard}`, config);
      dispatch(getdashboardAction(response?.data?.data));
      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};
export const all_vehicles = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");
      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };

      const jen: any = await localStorage.getItem("access_admin_token");
      const user = JSON.parse(jen);



      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`

      dispatch(loading(true));
      const response: any = await api.get(`${prfix + URL.all_vehicles_rollwise}?&page=${data?.pageNo}&id=${user?.data?.id}&role_id=${user?.data?.role_id}${data?.search ? "&search=" + data?.search : ""}`, config);
      // console.log(response?.data?.results);

      dispatch(getVehivleListAction(response?.data?.data));
      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};
export const create_vehicle = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");




      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };

      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      dispatch(loading(true));
      const response: any = await api.post(`${prfix + URL.create_vehicle}`, data);
      const jen: any = await localStorage.getItem("access_admin_token");
      const user = JSON.parse(jen);



      if (response?.data?.status == true) {
        toast.success(response?.data?.message)
        // const responseget: any = await api.get(`${prfix + URL.all_vehicles_rollwise}?page=1&id=${user?.data?.id}&role_id=${user?.data?.role_id}`, config);
        // // dispatch(getroleListAction(response?.data?.data));
        // dispatch(getVehivleListAction(responseget?.data?.data));
      } else {
        toast.error(response?.data?.message)
      }


      dispatch(loading(false));


      return response?.data
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
      return error?.response?.data
    }
  };
};
export const assign_vehicle_vendor = (data: any, pageNo: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");




      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      dispatch(loading(true));
      const response: any = await api.post(`${prfix + URL.assign_vehicle_vendor}`, data);
      const jen: any = await localStorage.getItem("access_admin_token");
      const user = JSON.parse(jen);


      if (response?.data?.status == true) {
        toast.success(response?.data?.message)
        //  const responseget: any = await api.get(`${prfix + URL.all_vehicles_rollwise}?page=1&id=${user?.data?.id}&role_id=${user?.data?.role_id}`, config);
        // // dispatch(getroleListAction(response?.data?.data));
        // dispatch(getVehivleListAction(responseget?.data?.data));
      } else {
        toast.error(response?.data?.message)
      }


      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};





export const circleList = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");


      // console.log(typeof token);
      // console.log(JSON.parse(token));

      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };



      dispatch(loading(true));
      const response: any = await api.get(`${URL.circleList}`, config);
      dispatch(getCrealeLsitAction(response?.data?.data));
      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};


export const vehicleDetail = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");




      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };

      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      dispatch(loading(true));
      const response: any = await api.post(`${prfix + URL.vehicleDetail}`, data);

      if (response?.data?.status == true) {
        // toast.success(response?.data?.message)
        // const responseget:any = await api.get(`${URL.all_vehicles}?page=${pageNo}`,config );
        // dispatch(getroleListAction(response?.data?.data));
        dispatch(getVehivleDetailsAction(response?.data?.data));
      } else {
        toast.error(response?.data?.message)
      }


      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};


export const add_vehicle_doc = (data: any, pageNo: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");




      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };

      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      dispatch(loading(true));
      const response: any = await api.post(`${prfix + URL.add_vehicle_doc}`, data);

      if (response?.data?.status == true) {
        toast.success(response?.data?.message)
        // const responseget: any = await api.get(`${prfix + URL.all_vehicles}?page=${pageNo}`, config);
        // // dispatch(getroleListAction(response?.data?.data));
        // dispatch(getVehivleListAction(responseget?.data?.data));
      } else {
        toast.error(response?.data?.message)
      }


      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};

export const update_vehicle_doc = (data: any, pageNo: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");




      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      dispatch(loading(true));
      const response: any = await api.post(`${URL.update_vehicle_doc}`, data);

      if (response?.data?.status == true) {
        // toast.success(response?.data?.message)
        // const responseget: any = await api.get(`${URL.all_vehicles}?page=${pageNo}`, config);
        // // dispatch(getroleListAction(response?.data?.data));
        // dispatch(getVehivleListAction(responseget?.data?.data));
      } else {
        toast.error(response?.data?.message)
      }


      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};
export const vehicle_delete = (data: any, pageNo: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");




      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      dispatch(loading(true));
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      const response: any = await api.post(`${prfix + URL.vehicle_delete}`, data);

      if (response?.data?.status == true) {
        toast.success(response?.data?.message)
        // const responseget: any = await api.get(`${prfix + URL.all_vehicles}?page=${pageNo}`, config);
        // // dispatch(getroleListAction(response?.data?.data));
        // dispatch(getVehivleListAction(responseget?.data?.data));
      } else {
        toast.error(response?.data?.message)
      }


      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};







export const documents = (data: any, data2: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");




      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      dispatch(loading(true));
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      const response: any = await api.post(`${prfix + URL.documents}`, data);

      if (response?.data?.status == true) {
        toast.success(response?.data?.message)
        // const responseget:any = await api.get(`${URL.user}`,config );
        // const responseget: any = await api.get(`${prfix + URL.userRoleWise}?page=${data2?.page}&role_id=${data2?.role_id}`, config);
        // // dispatch(getroleListAction(response?.data?.data));
        // dispatch(getusersListAction(responseget?.data?.data));
      } else {
        toast.error(response?.data?.message)
      }


      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};
export const documents_update = (data: any, data2: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");




      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      dispatch(loading(true));

      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      const response: any = await api.post(`${prfix + URL.documents_update}`, data);

      if (response?.data?.status == true) {
        toast.success(response?.data?.message)
        // const responseget:any = await api.get(`${URL.user}`,config );
        // const responseget: any = await api.get(`${prfix + URL.userRoleWise}?page=${data2?.page}&role_id=${data2?.role_id}`, config);
        // // dispatch(getroleListAction(response?.data?.data));
        // dispatch(getusersListAction(responseget?.data?.data));
      } else {
        toast.error(response?.data?.message)
      }


      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};
export const documentsApprove = (data: any, data2: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");




      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      dispatch(loading(true));
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      const response: any = await api.post(`${prfix + URL.documentsApprove}`, data);

      if (response?.data?.status == true) {
        toast.success(response?.data?.message)
        // const responseget:any = await api.get(`${URL.user}`,config );
        // const responseget: any = await api.get(`${prfix + URL.userRoleWise}?page=${data2?.page}&role_id=${data2?.role_id}`, config);
        // // dispatch(getroleListAction(response?.data?.data));
        // dispatch(getusersListAction(responseget?.data?.data));
      } else {
        toast.error(response?.data?.message)
      }


      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};
export const activeInactive = (data: any, data2: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");




      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      dispatch(loading(true));
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      const response: any = await api.post(`${prfix + URL.activeInactive}`, data);

      if (response?.data?.status == true) {
        toast.success(response?.data?.message)
        // const responseget:any = await api.get(`${URL.user}`,config );
        // const responseget: any = await api.get(`${prfix + URL.userRoleWise}?page=${data2?.page}&role_id=${data2?.role_id}`, config);
        // // dispatch(getroleListAction(response?.data?.data));
        // dispatch(getusersListAction(responseget?.data?.data));
      } else {
        toast.error(response?.data?.message)
      }


      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};
export const createuserAndDriver = (data: any, data2: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");




      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      dispatch(loading(true));
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      const response: any = await api.post(`${prfix + URL.user}`, data);

      if (response?.data?.status == true) {
        toast.success(response?.data?.message)


        // const responseget:any = await api.get(`${URL.user}`,config );
        // const responseget: any = await api.get(`${prfix + URL.userRoleWise}?page=${data2?.page}&role_id=${data2?.role_id}`, config);
        // // dispatch(getroleListAction(response?.data?.data));
        // dispatch(getusersListAction(responseget?.data?.data));
      } else {
        toast.error(response?.data?.message)

        toast.error(JSON.stringify(response?.data?.error))
      }


      dispatch(loading(false));


      return response?.data
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
      return error?.response?.data
    }
  };
};


export const createuserByJen = (data: any, navigate: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");




      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      dispatch(loading(true));
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      const response: any = await api.post(`${prfix + URL.user}`, data);

      if (response?.data?.status == true) {
        toast.success(response?.data?.message)

        navigate('/trip-book/' + response?.data?.data?.id)

        // const responseget:any = await api.get(`${URL.user}`,config );
        // const responseget:any = await api.get(`${prfix+URL.userRoleWise}?page=${data2?.page}&role_id=${data2?.role_id}`,config );
        // dispatch(getroleListAction(response?.data?.data));
        // dispatch(getusersListAction(responseget?.data?.data));
      } else {
        toast.error(response?.data?.message)
      }


      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};
export const createuserByJens = (data: any, navigate: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");




      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      dispatch(loading(true));
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      const response: any = await api.post(`${prfix + URL.user}`, data);

      if (response?.data?.status == true) {
        toast.success(response?.data?.message)

        navigate('/trip-books/' + response?.data?.data?.id)

        // const responseget:any = await api.get(`${URL.user}`,config );
        // const responseget:any = await api.get(`${prfix+URL.userRoleWise}?page=${data2?.page}&role_id=${data2?.role_id}`,config );
        // dispatch(getroleListAction(response?.data?.data));
        // dispatch(getusersListAction(responseget?.data?.data));
      } else {
        toast.error(response?.data?.message)
      }


      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};



export const assign_driver = (data: any, data2: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");




      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      dispatch(loading(true));
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      const response: any = await api.post(`${prfix + URL.assign_driver}`, data);

      if (response?.data?.status == true) {
        toast.success(response?.data?.message)
        // const responseget:any = await api.get(`${URL.user}`,config );
        // const responseget: any = await api.get(`${prfix + URL.all_vehicle_driver}?page=${data2?.page}`, config);
        // // dispatch(getroleListAction(response?.data?.data));
        // dispatch(assignDriverAction(responseget?.data?.data));
      } else {
        toast.error(response?.data?.message)
      }


      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};


export const all_vehicle_driver = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");




      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      dispatch(loading(true));
      const response: any = await api.get(`${prfix + URL.all_vehicle_driver}?page=${data?.page}${data?.role_id ? '&role_id=' + data?.role_id : ''}${data?.search ? '&search=' + data?.search : ''}`, config);
      dispatch(assignDriverAction(response?.data?.data));
      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};

export const all_vehicle_driver_Filter = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");




      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      dispatch(loading(true));
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      const response: any = await api.get(`${prfix + URL.all_vehicle_driver}?page=${data?.page}&circle_id=${data?.role_id}`, config);
      dispatch(assignDriverAction(response?.data?.data));
      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};



export const deleteAssignDriver = (data: any, pageNo: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");

      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      dispatch(loading(true));
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      const response: any = await api.post(`${prfix + URL.deleteAssignDriver}`, { id: data });

      if (response?.data?.status == true) {
        toast.success(response?.data?.message)
        // const responseget: any = await api.get(`${prfix + URL.all_vehicle_driver}?page=${pageNo}`, config);
        // // dispatch(getroleListAction(response?.data?.data));
        // dispatch(assignDriverAction(responseget?.data?.data));
      } else {
        toast.error(response?.data?.message)
      }
      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};

export const user_destination = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");

      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      dispatch(loading(true));
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      const response: any = await api.post(`${prfix + URL.user_destination}`, data);

      if (response?.data?.status == true) {
        toast.success(response?.data?.message)
        // const responseget: any = await api.get(`${prfix + URL.get_user_destination}?page=1`, config);
        // // dispatch(getroleListAction(response?.data?.data));
        // dispatch(destinationDetailsAction(responseget?.data?.data));
      } else {
        toast.error(response?.data?.message)
      }


      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};
export const delete_user_destination = (data: any, pageNo: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");

      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      dispatch(loading(true));
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      const response: any = await api.post(`${prfix + URL.delete_user_destination}`, data);

      if (response?.data?.status == true) {
        toast.success(response?.data?.message)
        // const responseget: any = await api.get(`${prfix + URL.get_user_destination}?page=${pageNo}`, config);
        // // dispatch(getroleListAction(response?.data?.data));
        // dispatch(destinationDetailsAction(responseget?.data?.data));
      } else {
        toast.error(response?.data?.message)
      }


      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};
export const repeatBooking = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");




      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      dispatch(loading(true));
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      const response: any = await api.post(`${prfix + URL.repeatBooking}`, data);

      if (response?.data?.status == true) {
        toast.success(response?.data?.message)

        // navigete("/dashboard")
        // const responseget:any = await api.get(`${prfix+URL.get_user_destination}?page=${pageNo}`,config );
        // dispatch(getroleListAction(response?.data?.data));
        // dispatch(destinationDetailsAction(responseget?.data?.data));
      } else {
        toast.error(response?.data?.message)
      }


      dispatch(loading(false));
      return response?.data
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
      return error?.response?.data
    }
  };
};

export const create_booking = (data: any, navigete: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");




      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      dispatch(loading(true));
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      const response: any = await api.post(`${prfix + URL.create_booking}`, data);

      if (response?.data?.status == true) {
        toast.success(response?.data?.message)

        navigete("/dashboard")
        // const responseget:any = await api.get(`${prfix+URL.get_user_destination}?page=${pageNo}`,config );
        // dispatch(getroleListAction(response?.data?.data));
        // dispatch(destinationDetailsAction(responseget?.data?.data));
      } else {
        toast.error(response?.data?.message)
      }


      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};
export const get_user_destination = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");



      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      dispatch(loading(true));
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      const response: any = await api.get(`${prfix + URL.get_user_destination}?page=${data.page}${data.search ? `&search=${data.search}` : ''}`, config);
      dispatch(destinationDetailsAction(response?.data?.data));
      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};




export const getrolesList = (data: any) => {
  return async (dispatch: any) => {
    try {
      // const token:any = await localStorage.getItem("kt-auth-react-v");


      console.log("typeof token");
      // console.log(JSON.parse(token));

      // const config = {
      //   headers: {
      //     Authorization: "Bearer " + JSON.parse(token).api_token,
      //   },
      // };
      dispatch(loading(true));

      // console.log("typeof token");
      // const  prfix  = `/api/${JSON.parse(token)?.data?.prefix}`

      const response: any = await api.get(`${URL.roles}`);
      // console.log("typeof token");

      // console.log(response?.data?.data);

      dispatch(getRoleListAction(response?.data?.data));
      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};

export const getPermissionsList = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");


      // console.log(typeof token);
      // console.log(JSON.parse(token));

      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      dispatch(loading(true));
      const response: any = await api.get(`${prfix + URL.getPermissionsList}`, config);
      dispatch(getperListAction(response?.data?.data));
      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};

export const getrate = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");


      // console.log(typeof token);
      // console.log(JSON.parse(token));

      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      dispatch(loading(true));
      const response: any = await api.get(`${prfix + URL.rate}?page=${data?.page}${data?.search ? `&search=${data?.search}` : ''}`, config);
      dispatch(getrateListAction(response?.data?.data));
      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};


export const createcircle = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");


      // console.log(typeof token);
      // console.log(JSON.parse(token));

      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      dispatch(loading(true));
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      const response: any = await api.post(`${prfix + URL.circle}`, data);

      if (response?.data?.status == true) {
        toast.success(response?.data?.message)
        const responseget: any = await api.get(`${prfix + URL.circle}`, config);
        // dispatch(getroleListAction(response?.data?.data));
        dispatch(getcircleListAction(responseget?.data?.data));
      } else {
        toast.error(response?.data?.message)
      }


      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};
export const getgetAllCircles = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");


      // console.log(typeof token);
      // console.log(JSON.parse(token));

      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };

      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      dispatch(loading(true));
      const response: any = await api.get(`${prfix + URL.getAllCircles}`, config);
      dispatch(getallcricleAction(response?.data?.data));
      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};
export const getcircle = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");


      // console.log(typeof token);
      // console.log(JSON.parse(token));

      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      dispatch(loading(true));
      const response: any = await api.get(`${prfix + URL.circle}?page=${data}`, config);
      dispatch(getcircleListAction(response?.data?.data));
      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};
export const getuserdetails = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");


      // console.log(typeof token);
      // console.log(JSON.parse(token));

      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      dispatch(loading(true));
      const response: any = await api.get(`${prfix + URL.user}/${data}`, config);
      dispatch(getusersDetailsAction(response?.data?.data));
      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};


export const activeInactive2 = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");
      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      dispatch(loading(true));

      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      const response: any = await api.post(`${prfix + URL.activeInactive}`, data, config);

      if (response?.data?.status == true) {
        toast.success(response?.data?.message)
      } else {
        toast.error(response?.data?.message)
      }

      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};


export const createuser = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");


      // console.log(typeof token);
      // console.log(JSON.parse(token));

      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      dispatch(loading(true));
      const response: any = await api.post(`${prfix + URL.user}`, data, config);

      if (response?.data?.status == true) {
        toast.success(response?.data?.message)
        console.log("kjhghjdsgfj");


        // const responseget: any = await api.get(`${prfix + URL.user}`, config);
        // // dispatch(getroleListAction(response?.data?.data));
        // dispatch(getusersListAction(responseget?.data?.data));
      } else {
        toast.error(response?.data?.message)
        toast.error(JSON.stringify(response?.data?.error))
      }


      dispatch(loading(false));

      return response?.data
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
      return error?.response?.data
    }
  };
};

export const deleteProfile = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");


      // console.log(typeof token);
      // console.log(JSON.parse(token));

      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      dispatch(loading(true));
      // const response:any = await api.post(`${URL.user}`,data );
      const response: any = await api.post(`${prfix + URL.deleteProfile}`, { id: data?.id }, config);
      if (response?.data?.status == true) {
        toast.success(response?.data?.message)

      } else {
        toast.error(response?.data?.message)
      }
      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};

export const deleteuser = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");


      // console.log(typeof token);
      // console.log(JSON.parse(token));

      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      dispatch(loading(true));
      // const response:any = await api.post(`${URL.user}`,data );
      const response: any = await api.delete(`${prfix + URL.user}/${data?.id}`,);
      if (response?.data?.status == true) {
        toast.success(response?.data?.message)
        // const responseget: any = await api.get(`${prfix + URL.user}`, config);
        // // dispatch(getroleListAction(response?.data?.data));
        // dispatch(getusersListAction(responseget?.data?.data));
      } else {
        toast.error(response?.data?.message)
      }


      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};


export const updateUser = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");



      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      dispatch(loading(true));
      const response: any = await api.post(`${prfix + URL.update_user}`, data, config);

      if (response?.data?.status == true) {
        toast.success(response?.data?.message)

      } else {
        toast.error(response?.data?.message)
      }


      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};


export const updateProfile = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");



      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };

      // name: e.name,
      // city: e.city,
      // pincode: e.pincode,

      // id,type,status
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      dispatch(loading(true));
      const response: any = await api.post(`${prfix + URL.updateProfile}`, data, config);

      if (response?.data?.status == true) {
        toast.success(response?.data?.message)
        // const responseget: any = await api.get(`${URL.circle}?page=${data?.page}`, config);
        // dispatch(getroleListAction(response?.data?.data));
        // dispatch(getuser(data?.page, ''))
      } else {
        toast.error(response?.data?.message)
      }


      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};

export const getuser = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");


      // console.log(typeof token);
      // console.log(JSON.parse(token));

      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      dispatch(loading(true));
      const response: any = await api.get(`${prfix + URL.user}?page=${data?.pageNo}${data?.search ? `&search=${data?.search}` : ""}`, config);

      // console.log(response);

      dispatch(getusersListAction(response?.data?.data));
      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      dispatch(getusersListAction({}));

      toast.error(error?.response?.data?.message);
    }
  };
};


export const getdepartmentuser = (page: any, search: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`


      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      dispatch(loading(true));
      const response: any = await api.get(`${prfix + URL.department}?page=${page}${search ? `&search=${search}` : ''}`, config);
      dispatch(getusersListAction(response?.data?.data));
      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};


export const createProfile = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");


      // console.log(typeof token);
      // console.log(JSON.parse(token));

      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      dispatch(loading(true));
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      const response: any = await api.post(`${prfix + URL.createProfile}`, data, config);

      if (response?.data?.status == true) {
        toast.success(response?.data?.message)
        // const responseget: any = await api.get(`${prfix + URL.getAllProfile}?page=1`, config);
        // // dispatch(getroleListAction(response?.data?.data));
        // dispatch(getProfileListAction(responseget?.data?.data));
      } else {
        toast.error(response?.data?.message)
      }


      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};



export const assignUserProfile = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");


      // console.log(typeof token);
      // console.log(JSON.parse(token));

      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      dispatch(loading(true));
      const response: any = await api.post(`${prfix + URL.assignUserProfile}`, data, config);

      if (response?.data?.status == true) {
        toast.success(response?.data?.message)
        // const responseget: any = await api.get(`${prfix + URL.getAllProfile}?page=1`, config);
        // // dispatch(getroleListAction(response?.data?.data));
        // dispatch(getProfileListAction(responseget?.data?.data));
      } else {
        toast.error(response?.data?.message)
      }


      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};

export const getAllProfile = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");


      // console.log(typeof token);
      // console.log(JSON.parse(token));

      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      dispatch(loading(true));
      const response: any = await api.get(`${prfix + URL.getAllProfile}?page=${data.page}${data?.search ? `&search=${data?.search}` : ""}`, config);
      dispatch(getProfileListAction(response?.data?.data));
      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};
export const getUsersForLogin = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");


      // console.log(typeof token);
      // console.log(JSON.parse(token));

      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      const role_id = `${JSON.parse(token)?.data?.circle_id}`
      console.log(role_id);

      dispatch(loading(true));
      const response: any = await api.get(`${prfix + URL.getUsersForLogin}?page=${data.page}&circle_id=${role_id}${data?.search ? `&search=${data?.search}` : ""}`, config);
      dispatch(getuserforloginAction(response?.data?.data));
      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};




export const getuserRoleWise = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");


      // console.log(typeof token);
      // console.log(JSON.parse(token));

      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      dispatch(loading(true));
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      const response: any = await api.get(`${prfix + URL.userRoleWise}?page=${data?.page}&role_id=${data?.role_id}${data?.search ? `&search=${data?.search}` : ""}`, config);
      console.log(response?.data?.data);

      dispatch(getusersListAction(response?.data?.data));
      dispatch(loading(false));

      return response?.data
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
      return error?.response?.data
    }
  };
};

export const deletecircle = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");


      // console.log(typeof token);
      // console.log(JSON.parse(token));

      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      dispatch(loading(true));
      const response: any = await api.delete(`${URL.circle}/${data?.id}`,);
      // id:productID, page:pageNo
      if (response?.data?.status == true) {
        toast.success(response?.data?.message)
        const responseget: any = await api.get(`${URL.circle}?page=${data?.page}`, config);
        // dispatch(getroleListAction(response?.data?.data));
        dispatch(getcircleListAction(responseget?.data?.data));
      } else {
        toast.error(response?.data?.message)
      }


      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};

export const updatecircle = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");


      // console.log(typeof token);
      // console.log(JSON.parse(token));

      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };

      console.log(data);


      // name: e.name,
      // city: e.city,
      // pincode: e.pincode,

      // id,type,status
      dispatch(loading(true));
      const response: any = await api.put(`${URL.circle}/${data?.cate_id}?name=${data?.name}&city=${data?.city}&pincode=${data?.pincode}`,);

      if (response?.data?.status == true) {
        toast.success(response?.data?.message)
        // const responseget: any = await api.get(`${URL.circle}?page=${data?.page}`, config);
        // // dispatch(getroleListAction(response?.data?.data));
        // dispatch(getcircleListAction(responseget?.data?.data));
      } else {
        toast.error(response?.data?.message)
      }


      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};

export const createrate = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");


      // console.log(typeof token);
      // console.log(JSON.parse(token));

      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      dispatch(loading(true));
      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      const response: any = await api.post(`${prfix + URL.rate}`, data);

      if (response?.data?.status == true) {
        toast.success(response?.data?.message)
        // const responseget: any = await api.get(`${URL.rate}`, config);
        // // dispatch(getroleListAction(response?.data?.data));
        // dispatch(getrateListAction(responseget?.data?.data));
      } else {
        toast.error(response?.data?.message)
      }


      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};
export const deleteRaye = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");


      // console.log(typeof token);
      // console.log(JSON.parse(token));

      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      dispatch(loading(true));

      const prfix = `/api/${JSON.parse(token)?.data?.prefix}`
      const response: any = await api.delete(`${prfix + URL.rate}/${data}`,);

      if (response?.data?.status == true) {
        toast.success(response?.data?.message)
        // const responseget: any = await api.get(`${prfix + URL.rate}`, config);
        // // dispatch(getroleListAction(response?.data?.data));
        // dispatch(getrateListAction(responseget?.data?.data));
      } else {
        toast.error(response?.data?.message)
      }


      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};


export const updaterate = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");


      // console.log(typeof token);
      // console.log(JSON.parse(token));

      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };

      console.log(data);


      // id,type,status
      dispatch(loading(true));
      const response: any = await api.put(`${URL.rate}/${data?.circle_id}?name=${data?.name}&price=${data?.price}&circle_id=${data?.circle_id}&kmFrom=${data?.kmFrom}&kmTo=${data?.kmTo}&effectiveDate=${data?.effectiveDate}&price=${data?.price}&remark=${data?.remark}`,);

      if (response?.data?.status == true) {
        toast.success(response?.data?.message)
        // const responseget: any = await api.get(`${URL.rate}`, config);
        // // dispatch(getroleListAction(response?.data?.data));
        // dispatch(getrateListAction(responseget?.data?.data));
      } else {
        toast.error(response?.data?.message)
      }


      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};

export const getRoleList = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");


      console.log(typeof token);
      console.log(JSON.parse(token));

      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      dispatch(loading(true));
      const response: any = await api.get(`${URL.getRoleList}`);
      dispatch(getroleListAction(response?.data?.data));
      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};
export const createRoles = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");


      // console.log(typeof token);
      // console.log(JSON.parse(token));

      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      dispatch(loading(true));
      const response: any = await api.post(`${URL.createRoles}`, data);
      dispatch(getroleListAction(response?.data?.data));
      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};
export const createPermission = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");


      // console.log(typeof token);
      // console.log(JSON.parse(token));

      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      dispatch(loading(true));
      const response: any = await api.post(`${URL.getPermissionsList}`, data);

      if (response?.data?.status == true) {
        toast.success(response?.data?.message)
        const responseget: any = await api.get(`${URL.getPermissionsList}`, config);
        // dispatch(getroleListAction(response?.data?.data));
        dispatch(getperListAction(responseget?.data?.data));
      } else {
        toast.error(response?.data?.message)
      }


      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};
export const deletePermission = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");


      // console.log(typeof token);
      // console.log(JSON.parse(token));

      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };
      dispatch(loading(true));
      const response: any = await api.delete(`${URL.getPermissionsList}/${data}`,);

      if (response?.data?.status == true) {
        toast.success(response?.data?.message)
        const responseget: any = await api.get(`${URL.getPermissionsList}`, config);
        // dispatch(getroleListAction(response?.data?.data));
        dispatch(getperListAction(responseget?.data?.data));
      } else {
        toast.error(response?.data?.message)
      }


      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};
export const updatePermission = (data: any) => {
  return async (dispatch: any) => {
    try {
      const token: any = await localStorage.getItem("kt-auth-react-v");


      // console.log(typeof token);
      // console.log(JSON.parse(token));

      const config = {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).api_token,
        },
      };

      // id,type,status
      dispatch(loading(true));
      const response: any = await api.put(`${URL.getPermissionsList}/${data?.id}?type=${data?.type}&status=${data?.status}`,);

      if (response?.data?.status == true) {
        toast.success(response?.data?.message)
        const responseget: any = await api.get(`${URL.getPermissionsList}`, config);
        // dispatch(getroleListAction(response?.data?.data));
        dispatch(getperListAction(responseget?.data?.data));
      } else {
        toast.error(response?.data?.message)
      }


      dispatch(loading(false));
    }
    catch (error: any) {
      dispatch(loading(false));
      toast.error(error?.response?.data?.message);
    }
  };
};






