const express = require("express");
const { httpGetPhoneme, httpGetVideoPhoneme, httpComparePhoneme } = require("./phoneme.controller");

const phonemeRouter = express.Router();

phonemeRouter.get("/:name", httpGetPhoneme);
phonemeRouter.get("/video/:name", httpGetVideoPhoneme);
phonemeRouter.post("/compare/:name", httpComparePhoneme);

module.exports = { phonemeRouter };
