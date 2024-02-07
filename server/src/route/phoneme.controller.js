const { getPhoneme } = require("../model/phoneme.model");

async function httpGetPhoneme(req, res) {
  try {
    const phoneme = await getPhoneme(req.params.name);
    res.send(phoneme);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  httpGetPhoneme,
};
