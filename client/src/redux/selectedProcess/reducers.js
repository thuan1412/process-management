import * as actionTypes from "./actionTypes";

const INITIAL_STATE = -1;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SELECT_PROCESS:
      return action.selectedProcess;
    default:
      return state;
  }
};
