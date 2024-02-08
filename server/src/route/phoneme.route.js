const express = require("express");
const { httpGetPhoneme } = require("./phoneme.controller");

const phonemeRouter = express.Router();

phonemeRouter.get("/:name", httpGetPhoneme);

module.exports = { phonemeRouter };
