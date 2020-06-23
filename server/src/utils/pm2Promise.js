const pm2 = require("pm2");

const list = () => {
  return new Promise((resolve, reject) => {
    pm2.list((err, processes) => {
      if (err) {
        reject(err);
      }
      resolve(processes);
    });
  });
};

const create = (scriptPath) => {
  return new Promise((resolve, reject) => {
    // script: `../sdas/${scriptPath}`,
    const options = {
      instances: 1,
      force: true,
      execMode: "cluster",
    };
    pm2.start(`./src/processes/${scriptPath}.js`, options, (err, process) => {
      if (err) {
        reject(err);
      }
      resolve(processes);
    });
  });
};

const start = (pm_id) => {
  return new Promise((resolve, reject) => {
    pm2.start(pm_id, (err, processes) => {
      if (err) {
        reject(err);
      }
      resolve(processes);
    });
  });
};

const deleteProcess = (pm_id) => {
  return new Promise((resolve, reject) => {
    pm2.delete(pm_id, (err, processes) => {
      if (err) {
        console.log(err);
        reject(err);
      } 
      resolve(processes);
    });
  });
};

const restart = (pm_id) => {
  return new Promise((resolve, reject) => {
    pm2.restart(pm_id, (err, processes) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(processes);
    });
  });
};

const stop = (pm_id) => {
  return new Promise((resolve, reject) => {
    pm2.stop(pm_id, (err, processes) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(processes);
    });
  });
};

module.exports = {
  list: list,
  create: create,
  delete: deleteProcess,
  restart: restart,
  stop: stop,
  start: start,
};
