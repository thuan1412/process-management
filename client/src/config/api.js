export default {
  base: process.env.SERVER_URL || "http://localhost:3001",
  list: "/list",
  describe: "/describe",
  start: "/start",
  stop: "/stop",
  delete: "/delete",
  create: "/create",
  restart: "/restart",
};
