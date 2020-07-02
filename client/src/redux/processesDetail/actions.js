import axios from "axios";

import { RECEIVE_PROCESSES_DETAIL } from "./actionsTypes";
import { API } from "../../config";

const receiveProcessesDetail = (processesDetail) => {
  return {
    type: RECEIVE_PROCESSES_DETAIL,
    processesDetail,
  };
};

export const fetchProcessesDetail = (pName) => {
  return (dispatch) => {
    return axios
      .get(`${API.BASE}${API.PM2.DESCRIBE}`, { params: { process: pName } })
      .then((res) => dispatch(receiveProcessesDetail(res.data)));
  };
};
