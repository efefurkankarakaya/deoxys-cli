const {
  processor,
  audioProcessingArgs,
  audioProcessingOptions,
  videoProcessingArgs,
  videoProcessingOptions,
} = require("./config");

const { downloadPath } = require("./paths");

const cp = require("child_process");
const fs = require("fs");
const ytdl = require("ytdl-core");

const processAudio = async (ref) => {
  const title = (await ytdl.getInfo(ref)).videoDetails.title;
  const fileName = title + ".mp3";
  const filePath = downloadPath + "/" + fileName;
  if (fs.existsSync(filePath)) {
    console.log(`${fileName} already exists.`);
    return filePath;
  }
  audioProcessingArgs[audioProcessingArgs.length - 1] = filePath;

  const audio = ytdl(ref, { quality: `highestaudio` });
  const ffmpegProcess = cp.spawn(
    processor,
    audioProcessingArgs,
    audioProcessingOptions
  );

  ffmpegProcess.on("close", () => {
    console.log("Done." + "\n");
  });

  ffmpegProcess.stdio[3].on("data", (chunk) => {
    console.log(chunk.toString() + "\n");
  });

  audio.pipe(ffmpegProcess.stdio[4]);

  return filePath
};

const processVideo = async (ref) => {
  const title = (await ytdl.getInfo(ref)).videoDetails.title;
  const fileName = title + ".mp4";
  const filePath = downloadPath + "/" + fileName;
  if (fs.existsSync(filePath)) {
    console.log(`${fileName} already exists.`);
    return filePath;
  }
  videoProcessingArgs[videoProcessingArgs.length - 1] = filePath;

  const audio = ytdl(ref, { quality: `highestaudio` });
  const video = ytdl(ref, { quality: `highestvideo` });

  const ffmpegProcess = cp.spawn(
    processor,
    videoProcessingArgs,
    videoProcessingOptions
  );

  ffmpegProcess.on("close", () => {
    console.log("Done." + "\n");
  });

  ffmpegProcess.stdio[3].on("data", (chunk) => {
    console.log(chunk.toString() + "\n");
  });

  audio.pipe(ffmpegProcess.stdio[4]);
  video.pipe(ffmpegProcess.stdio[5]);

  return filePath;
};

module.exports = { processAudio, processVideo };
