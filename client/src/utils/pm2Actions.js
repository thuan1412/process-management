import axios from "axios";
import { API } from "../config/index";

export const create = async (pname) => {
  await axios.post(`${API.BASE}${API.PM2.CREATE}`, {
    pname: pname,
  });
};

export const start = async (pm_id) => {
  await axios.post(`${API.BASE}${API.PM2.START}`, {
    pm_id: pm_id,
  });
};

export const restart = async (pm_id) => {
  await axios.post(`${API.BASE}${API.PM2.RESTART}`, {
    pm_id: pm_id,
  });
};

export const stop = async (pm_id) => {
  await axios.post(`${API.BASE}${API.PM2.STOP}`, {
    pm_id: pm_id,
  });
};
export const delete_ = async (pm_id) => {
  await axios.post(`${API.BASE}${API.PM2.DELETE}`, {
    pm_id: pm_id,
  });
};
