const router = require("express").Router();

const pm2Promise = require("../utils").pm2Promise;
const extractProcess = require("../utils").extractProcess;

router.get("/list", (req, res) => {
  pm2Promise.list().then((processes) => {
    res.send(processes.map(extractProcess));
  });
});

router.post("/create", (req, res) => {
  const pname = req.body.pname;
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
      res.status(500).send({ success: false, err: err });
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
      res.status(500).send({ success: false, err: err });
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
      res.status(500).send({ success: false, err: err });
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
