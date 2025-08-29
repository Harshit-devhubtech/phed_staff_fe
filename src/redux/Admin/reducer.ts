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
 type stateType = {
  loading:boolean;
  get_per_list: any;
  get_role_list: any;
  counsellordetail: any;
  coachAndCounsellor: any;
  counsellorinfo: any;
  counsellordetailBySlug: any;
  get_rate_list: any;
  get_circle_list: any;
  get_users_details: any;
  get_all_cricle: any;
  profile_list: any;
  roles_list: any;
  cercle_list: any;
  vehicle_details: any;
  vehicle_list: any;
  vehicle_list_vendor: any;
  station_list: any;
  station_Details: any;
  assign_driver: any;
  destionation_Details: any;
  get_user_for_login: any;
  get_all_booking: any;
  get_user_profile: any;
  get_dashboard: any;
  get_all_reports: any;
}
const initialState : stateType = {
    loading:false,
    get_per_list: [],
    get_role_list: [],
    counsellordetail: [],
    coachAndCounsellor: [],
    counsellorinfo: [],
    counsellordetailBySlug: [],
    get_all_cricle: [],
    roles_list: [],
    cercle_list: [],
    get_rate_list: {},
    get_circle_list: {},
    get_users_details: {},
    profile_list: {},
    vehicle_details: {},
    vehicle_list: {},
    vehicle_list_vendor: {},
    station_list: {},
    station_Details: {},
    assign_driver: {},
    destionation_Details: {},
    get_user_for_login: {},
    get_all_booking: {},
    get_user_profile: {},
    get_all_reports: {},
   
    get_dashboard: {},
};

export default (state = initialState, action:any) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: action.payload};
    case GET_PERMISSION_LISTS:
      return { ...state, get_per_list: action.payload};
    case GET_ROLES_LISTS:
      return { ...state, get_role_list: action.payload};
    case GET_RATE_LISTS:
      return { ...state, get_rate_list: action.payload};
    case GET_CIRCLE_LISTS:
      return { ...state, get_circle_list: action.payload};
    case GET_USERS_LISTS:
      return { ...state, get_users_list: action.payload};
    case GET_USERS_DETAILS:
      return { ...state, get_users_details: action.payload};
    case GET_ALL_CRICLE:
      return { ...state, get_all_cricle: action.payload};
    case PROFILE_LIST:
      return { ...state, profile_list: action.payload};
    case ROLES_LIST:
      return { ...state, roles_list: action.payload};
      case VEHICLE_LIST:
        return { ...state, vehicle_list: action.payload};
      case VEHICLE_LIST_VENDOR:
        return { ...state, vehicle_list_vendor: action.payload};
      case VEHICLE_DETAILS:
        return { ...state, vehicle_details: action.payload};
      case CERCLE_LIST:
        return { ...state, cercle_list: action.payload};
        case STATION_LIST:
          return { ...state, station_list: action.payload};
        case STATION_DETAILS:
          return { ...state, station_Details: action.payload};
          case ASSIGN_DRIVER:
            return { ...state, assign_driver: action.payload};
            case DESTINATION_DETAILS:
              return { ...state, destionation_Details: action.payload};
            case GET_USER_FOR_LOGIN:
              return { ...state, get_user_for_login: action.payload};
            case GET_ALL_BOOKING:
              return { ...state, get_all_booking: action.payload};
            case GET_USER_PROFILE:
              return { ...state, get_user_profile: action.payload};
            case GET_ALL_REPORT:
              return { ...state, get_all_reports: action.payload};
            case GET_DASHBOARD:
              return { ...state, get_dashboard: action.payload};
    default:
      return state;
  }
};