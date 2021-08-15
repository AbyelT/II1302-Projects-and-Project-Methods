import { checkUser } from "../actions/userAction";

const initialState = {
    user: checkUser(),
    colour: "",
    sidebar: false,
};

export default function reducer(state = initialState, action) {
    //console.log("reducer", state, action);
    switch (action.type) {
      case "LOGIN":
        return {
          ...state,
          user: action.payload,
        };
      case "LOGOUT":
        return {
          ...state,
          user: "",
        };
      case "SIDEBAR": 
        return {
          ...state,
          sidebar: !state.sidebar   
        };
      case "SIDEBAR_LOGOUT":
        return {
          ...state,
          sidebar: false,
        }
      default:
        return state;
    }
}
