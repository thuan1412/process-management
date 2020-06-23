const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/pm2_log", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Log = mongoose.model("Log", {
  pm_id: {
    type: Number,
  },
  pName: {
    type: String,
  },
  timestamp: {
    type: Date,
  },
  type: {
    type: String,
  },
  data: {
    type: String,
  },
});

module.exports = Log;
