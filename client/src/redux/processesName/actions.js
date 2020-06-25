import axios from "axios";

import * as actionTypes from "./actionsTypes";
import { API } from "../../config";

const recieveProcessName = (processesName) => {
  return {
    type: actionTypes.RECEIVE_PROCESSES,
    processesName,
  };
};

export const fetchProcessesName = () => {
  return (dispatch) => {
    return axios
      .get(`${API.BASE}${API.PROCESSES.PROCESSES}`)
      .then((res) => dispatch(recieveProcessName(res.data)));
  };
};
