const ffmpeg = require("ffmpeg-static");

const processor = ffmpeg;

const audioProcessingArgs = [
  "-loglevel",
  "8",
  "-hide_banner",
  "-progress",
  "pipe:3",
  "-i",
  "pipe:4",
  "-map",
  "0:a",
  "-c:v",
  "copy",
  "out.mp3",
];

const audioProcessingOptions = {
  windowsHide: true,
  stdio: ["inherit", "inherit", "inherit", "pipe", "pipe"],
};

const videoProcessingArgs = [
  "-loglevel",
  "8",
  "-hide_banner",
  "-progress",
  "pipe:3",
  "-i",
  "pipe:4",
  "-i",
  "pipe:5",
  "-map",
  "0:a",
  "-map",
  "1:v",
  "-c:v",
  "copy",
  "out.mp4",
];

const videoProcessingOptions = {
  windowsHide: true,
  stdio: ["inherit", "inherit", "inherit", "pipe", "pipe", "pipe"],
};

module.exports = {
  processor,
  audioProcessingArgs,
  audioProcessingOptions,
  videoProcessingArgs,
  videoProcessingOptions,
};
