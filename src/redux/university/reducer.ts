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
 type stateType = {
  loading:boolean;
  universityList: any[];
  universityById: any[];
  universities: any[];
  universityComment: any[];
  addUniversityComment: any[];
  getrankinguniversity: any[];
  universityBySlug: any[];
 }
const initialState : stateType = {
    loading:false,
    universityList: [],
    universityById: [],
    universities: [],
    universityComment: [],
    addUniversityComment: [],
    getrankinguniversity: [],
    universityBySlug: [],
};

export default (state = initialState, action:any) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: action.payload};
    case GET_UNIVERSITIES_LIST:
      return { ...state, universityList: action.payload};
      case GET_UNIVERSITIES_BY_ID:
      return { ...state, universityById: action.payload};
      case GET_UNIVERSITIES:
      return { ...state, universities: action.payload};
       case GET_ALL_UNIVERSITIES_COMMENT:
      return { ...state, universityComment: action.payload}; 
      case ADD_UNIVERSITIES_COMMENT:
      return { ...state, addUniversityComment: action.payload};
       case GET_RANKING_UNIVERSITIES:
      return { ...state, getrankinguniversity: action.payload};
       case GET_UNIVERSITIES_BY_SLUG:
      return { ...state, universityBySlug: action.payload};
    default:
      return state;
  }
};