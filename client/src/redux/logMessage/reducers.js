import * as actionTypes from "./actionTypes";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.RECEIVE_LOGS:
      return action.logs;
    default:
      return state;
  }
};
