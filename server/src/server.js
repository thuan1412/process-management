const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const http = require("http");
const bodyParser = require("body-parser");
const pm2 = require("pm2");

const pm2Router = require("./routes/pm2");
const logRouter = require("./routes/log");

require("./log").writeLog(pm2);

require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();
const server = http.createServer(app);

// add middleware to server
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors("*"));

app.use("/api/pm2", pm2Router);
app.use("/api/log", logRouter);

app.listen(PORT, () => {
  console.log(`Listen on http://localhost:${PORT}`);
});
