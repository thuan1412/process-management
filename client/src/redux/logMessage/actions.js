import axios from "axios";

import { RECEIVE_LOGS } from "./actionTypes";
import { API } from "../../config";

const receiveLogs = (logs) => {
  return {
    type: RECEIVE_LOGS,
    logs,
  };
};

export const fetchProcessDetail = (pm_id, count) => {
  return (dispatch) => {
    return axios
      .get(`${API.BASE}${API.LOG}`, { params: { count: count, pm_id: pm_id } })
      .then((res) => dispatch(receiveLogs(res.data)));
  };
};
