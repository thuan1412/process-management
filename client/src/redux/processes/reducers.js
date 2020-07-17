import { RECEIVE_PROCESSES } from "./actionsTypes";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RECEIVE_PROCESSES:
      return action.processes;
    default:
      return state;
  }
};
