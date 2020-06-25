const router = require("express").Router();
const fs = require("fs");

router.get("/", (req, res) => {
	fs.readdir("./src/processes", (err, dir) => {
		if (err) {
			console.log(err);
		}
		res.send(dir);
	})
})

module.exports = router;
