const router = require("express").Router();

const pm2Promise = require("../utils").pm2Promise;
const extractProcess = require("../utils").extractProcess;

router.get("/list", (req, res) => {
  pm2Promise.list().then((processes) => {
    res.send(processes.map(extractProcess));
  });
});

const cpu_hist = {};
const memory_hist = {};

router.get("/describe", (req, res) => {
  const process = req.query.process;
  pm2Promise
    .describe(process)
    .then((processDescription) => {
      res.send(
        processDescription.map((proc, i) => {
          proc = extractProcess(proc);
          if (!cpu_hist[proc.pm_id]) {
            cpu_hist[proc.pm_id] = Array.from({ length: 50 }).fill(0).slice(1);
          }

          if (!memory_hist[proc.pm_id]) {
            memory_hist[proc.pm_id] = Array.from({ length: 50 })
              .fill(0)
              .slice(1);
          }

          cpu_hist[proc.pm_id] = cpu_hist[proc.pm_id].slice(1);
          cpu_hist[proc.pm_id].push(proc.cpu);

          memory_hist[proc.pm_id] = memory_hist[proc.pm_id].slice(1);
          memory_hist[proc.pm_id].push(proc.memory);
          return {
            ...proc,
            cpu_hist: cpu_hist[proc.pm_id],
            memory_hist: memory_hist[proc.pm_id],
          };
        })
      );

      // res.send(processDescription.map(proc => {
      //
      // 	return {
      // 		...extractedProc,
      // 		cpu_hist: cpu_hist[extractedProc.pm_id],
      // 		memory_hist: momory_hist[extractedProc.]
      // 	}
      // }));
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/create", (req, res) => {
  const pname = req.body.pname;
  console.log(req.body);
  pm2Promise
    .create(pname)
    .then((processes) =>
      res.send({
        success: true,
        process: processes[0].pm2_env.pm_id,
      })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        success: false,
        err: err,
      });
    });
});

router.post("/delete", (req, res) => {
  const pm_id = req.body.pm_id;
  pm2Promise
    .delete(pm_id)
    .then((processes) => {
      res.send({
        success: true,
        process: processes[0].pm2_env.pm_id,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        success: false,
        err: err,
      });
    });
});

router.post("/stop", (req, res) => {
  const pm_id = req.body.pm_id;
  console.log(pm_id);
  pm2Promise
    .stop(pm_id)
    .then((processes) => {
      res.send({
        success: true,
        process: processes[0].pm2_env.pm_id,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        success: false,
        err: err,
      });
    });
});

router.post("/start", (req, res) => {
  const pm_id = req.body.pm_id;
  pm2Promise
    .start(pm_id)
    .then((processes) => {
      res.send({
        success: true,
        process: processes[0].pm2_env.pm_id,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
