const extractProcess = (process) => {
  return {
    pm_id: process.pm2_env.pm_id,
    name: process.name,
    memory: process.monit.memory,
    cpu: process.monit.cpu,
    status: process.pm2_env.status,
  };
};

module.exports = extractProcess;
