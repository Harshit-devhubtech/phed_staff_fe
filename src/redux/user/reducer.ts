import { 
    LOADING,
    LOGIN,
    REGISTER,
} from "../common/constant";
   type stateType = {
    loading:boolean;
    login: any;
    register: any;
   }
  const initialState : stateType = {
      loading:false,
      login: {},
      register: {},
  };
  
  export default (state = initialState, action:any) => {
    switch (action.type) {
      case LOADING:
        return { ...state, loading: action.payload};
      case LOGIN:
        return { ...state, login: action.payload};
      case REGISTER:
        return { ...state, register: action.payload}
      default:
        return state;
    }
  };