const fs = require("fs");
const phoneme_model = require("./phoneme.mongo").phoneme;
const mongoose = require("mongoose");

// phoneme
// name, soundIn64

async function createPhoneme(phoneme) {
  await phoneme_model.updateOne({ name: phoneme.name }, phoneme, {
    upsert: true,
  });
}

async function getPhoneme(name) {
  try {
    const info = await phoneme_model.find({ name: name }).lean();
    return info[0].soundIn64;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  createPhoneme,
  getPhoneme,
};
