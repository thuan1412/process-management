const router = require("express").Router();
const Log = require("../log").Log;

router.get("/", (req, res) => {
  const pm_id = req.query.pm_id;
  const count = parseInt(req.query.count);
  const offset = parseInt(req.query.offset);
  const type = req.query.type || "out";
  Log.find()
    .where({
      pm_id: pm_id,
      type: type,
    })
    .sort({
      timestamp: -1,
    })
    .skip(offset)
    .limit(count)
    .then((logs) => {
      res.send(logs);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
