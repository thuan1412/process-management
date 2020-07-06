import * as actionTypes from "./actionTypes";

export const selectProcess = (selectedProcess) => {
  return {
    type: actionTypes.SELECT_PROCESS,
    selectedProcess,
  };
};
