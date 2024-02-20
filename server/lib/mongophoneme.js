const fs = require("fs").promises;
const { exec } = require("child_process");
const path = require("path");

const {
  createPhoneme,
  createVideoPhoneme,
  removeAllPhonemes,
} = require("../src/model/phoneme.model");

async function addPhoneme(folder = path.join(__dirname, "sample_sounds")) {
  try {
    const files = await fs.readdir(folder); // Read directory contents asynchronously
    for (const file of files) {
      const filePath = `${folder}/${file}`; // Construct the file path
      const data = await fs.readFile(filePath, { encoding: "base64" }); // Read file content in Base64 encoding
      await createPhoneme({ name: file, soundIn64: data }); // Assuming createPhoneme is an async function
    }
  } catch (err) {
    console.error("Error processing the folder", err);
  }
}

async function addPhonemeVideo(folder = path.join(__dirname, "sample_videos")) {
  try {
    const files = await fs.readdir(folder); // Read directory contents asynchronously
    for (const file of files) {
      const filePath = `${folder}/${file}`; // Construct the file path
      const data = await fs.readFile(filePath, { encoding: "base64" }); // Read file content in Base64 encoding
      await createVideoPhoneme({ name: file, video: data }); // Assuming createVideoPhoneme is an async function
    }
  } catch (err) {
    console.error("Error processing the folder", err);
  }
}

async function comparePhonemes(standardDir, phonemeDIR) {
  const scriptPath = path.join(__dirname, "acousticIDSimularity.sh");
  const auxScriptPath = path.join(__dirname, "audioprocessing.sh");
  const result = await new Promise((resolve, reject) => {
    exec(
      `sh ${scriptPath} ${standardDir} ${phonemeDIR} ${auxScriptPath}`,
      (error, stdout, stderr) => {
        if (error) {
          reject(error);
        }
        resolve(stdout);
      }
    );
  });
  return result;
}

async function removePhonemes() {
  removeAllPhonemes();
}

module.exports = {
  addPhoneme,
  addPhonemeVideo,
  comparePhonemes,
  removePhonemes,
};
