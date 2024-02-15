const express = require("express");
const { phonemeRouter } = require("./src/route/phoneme.route");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(morgan("combined"));
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/phoneme", phonemeRouter);

module.exports = {
  app,
};
