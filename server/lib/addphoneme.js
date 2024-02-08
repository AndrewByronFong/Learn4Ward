const fs = require("fs").promises;
const { createPhoneme } = require("../src/model/phoneme.model");

async function addPhoneme(folder) {
  try {
    const files = await fs.readdir(folder); // Read directory contents asynchronously
    for (const file of files) {
      const filePath = `${folder}/${file}`; // Construct the file path
      const data = await fs.readFile(filePath, { encoding: "base64" }); // Read file content in Base64 encoding
      createPhoneme({ name: file, soundIn64: data }); // Assuming createPhoneme is an async function
    }
  } catch (err) {
    console.error("Error processing the folder", err);
  }
}

module.exports = {
  addPhoneme,
};
