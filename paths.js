const fs = require("fs");
const clipboardy = require("clipboardy");

const downloadPath = "./downloads";

const createDownloadPath = () => {
  try {
    fs.mkdirSync(downloadPath);
  } catch (err) {
    console.log("Path already exists.");
  }
};

const copyPathToClipboard = () => {
  clipboardy.writeSync(fs.getcwd() + "/downloads");
}

module.exports = { downloadPath, createDownloadPath, copyPathToClipboard };
