const extractProcess = (process) => {
  return {
    pm_id: process.pm2_env.pm_id,
    name: process.name,
    memory: process.monit.memory,
    cpu: process.monit.cpu,
  };
};

module.exports = extractProcess;
