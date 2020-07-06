// import api from "./api";

const PM2 = {
  LIST: "/api/pm2/list",
  DESCRIBE: "/api/pm2/describe",
  START: "/api/pm2/start",
  STOP: "/api/pm2/stop",
  DELETE: "/api/pm2/delete",
  CREATE: "/api/pm2/create",
  RESTART: "/api/pm2/restart",
};

const PROCESSES = {
  PROCESSES: "/api/processes",
};

const LOG = {
  LOG: "/api/log",
};
export const API = {
  BASE: process.env.SERVER_URL || "http://localhost:3001",
  PM2: PM2,
  PROCESSES: PROCESSES,
  LOG: LOG,
};
