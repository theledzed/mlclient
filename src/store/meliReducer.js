import initialMeliState from "./initialMeliState";
import { SET_STATE } from "./actionTypes";

const meliReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_STATE:
      return { ...initialMeliState, ...state, ...payload };
    default:
      return state;
  }
};

export default meliReducer;
