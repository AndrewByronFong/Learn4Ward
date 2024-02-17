const express = require("express");
const { phonemeRouter } = require("./src/route/phoneme.route");
const path = require("path");
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
app.use(express.static(path.join(__dirname, "public")));
app.use("/phoneme", phonemeRouter);
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = {
  app,
};
