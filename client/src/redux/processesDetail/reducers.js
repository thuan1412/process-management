import { RECEIVE_PROCESSES_DETAIL } from "./actionsTypes";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RECEIVE_PROCESSES_DETAIL:
      return action.processesDetail;
    default:
      return state;
  }
};
