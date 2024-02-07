const express = require("express");
const { phonemeRouter } = require("./src/route/phoneme.route");
const morgan = require("morgan");

const app = express();

app.use(morgan("combined"));
app.use("/phoneme", phonemeRouter);

module.exports = {
  app,
};
