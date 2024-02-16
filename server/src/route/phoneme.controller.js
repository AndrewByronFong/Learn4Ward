const fs = require("fs").promises;
const path = require("path");
const { exec } = require("child_process");
const { getPhoneme, getVideoPhoneme} = require("../model/phoneme.model");
const { comparePhonemes } = require(path.join(
  __dirname,
  "..",
  "../lib/mongophoneme"
));

async function httpGetPhoneme(req, res) {
  try {
    const phoneme = await getPhoneme(req.params.name);
    res.send(phoneme);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function httpGetVideoPhoneme(req, res) {
  try {
    const phoneme = await getVideoPhoneme(req.params.name);
    res.send(phoneme);
  } catch (error) {
    res.status(500).send;
  }
}

async function httpComparePhoneme(req, res) {
  try {
    const phonemeStandard = await getPhoneme(req.params.name);
    const phonemeUser = req.body.soundIn64;

    const phonemeUserFileName = path.join(__dirname, `${req.params.name}.m4a`);
    const phonemeStandardFileName = path.join(
      __dirname,
      `standard${req.params.name}.m4a`
    );

    // Write the phonemeUser data to a file
    await fs.writeFile(phonemeUserFileName, phonemeUser, "base64");
    await fs.writeFile(phonemeStandardFileName, phonemeStandard, "base64");

    const result = await comparePhonemes(
      phonemeUserFileName,
      phonemeStandardFileName
    );

    // Send the result based on the comparison
    if (parseFloat(result) > 2) {
      res.send("1");
    } else {
      res.send("0");
    }
    await execPromise(`rm ${phonemeUserFileName} ${phonemeStandardFileName}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
}

function execPromise(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout);
    });
  });
}

module.exports = {
  httpGetPhoneme,
  httpComparePhoneme,
  httpGetVideoPhoneme
};
