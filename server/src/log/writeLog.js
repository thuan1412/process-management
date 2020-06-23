const Log = require("./Log");

const writeLog = (pm2) => {
  pm2.launchBus((err, bus) => {
    bus.on("log:*", (type, log) => {
      new Log({
        pm_id: log.process.pm_id,
        pName: log.process.name,
        timestamp: log.at,
        type: type,
        data: log.data,
      }).save();
    });
  });
};

module.exports = writeLog;
