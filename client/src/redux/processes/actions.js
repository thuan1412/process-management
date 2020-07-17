import axios from "axios";

import * as actionTypes from "./actionsTypes";
import { API } from "../../config";

const recieveProcesses = (processes) => {
  return {
    type: actionTypes.RECEIVE_PROCESSES,
    processes,
  };
};

export const fetchProcesses = () => {
  return (dispatch) => {
    return axios.get(`${API.BASE}${API.PROCESSES.PROCESSES}`).then((res) => {
      dispatch(recieveProcesses(res.data));
    });
  };
};
