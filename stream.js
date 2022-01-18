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
// const logUpdate = require("log-update");

const processAudio = async (ref) => {
  const title = (await ytdl.getInfo(ref)).videoDetails.title;
  const fileExtension = ".mp3";
  const fileName = title + fileExtension;
  const filePath = downloadPath + "/" + fileName;
  if (fs.existsSync(filePath)) {
    console.log(`${fileName} already exists.`);
    return filePath;
  }
  audioProcessingArgs[audioProcessingArgs.length - 1] = filePath;

  console.log(`${title} has started to being downloaded.`);

  const audio = ytdl(ref, { quality: `highestaudio` });

  const ffmpegProcess = cp.spawn(
    processor,
    audioProcessingArgs,
    audioProcessingOptions
  );

  // ffmpegProcess.stdio[3].on("data", (chunk) => {
  //   logUpdate(chunk.toString());
  // });

  ffmpegProcess.on("close", () => {
    console.log(`${title} has downloaded as audio.`);
  });

  audio.pipe(ffmpegProcess.stdio[4]);

  return filePath;
};

const processVideo = async (ref) => {
  const title = (await ytdl.getInfo(ref)).videoDetails.title;
  const fileExtension = ".mp4";
  const fileName = title + fileExtension;
  const filePath = downloadPath + "/" + fileName;
  if (fs.existsSync(filePath)) {
    console.log(`${fileName} already exists.`);
    return filePath;
  }
  videoProcessingArgs[videoProcessingArgs.length - 1] = filePath;

  console.log(`${title} has started to being downloaded.`);

  const audio = ytdl(ref, { quality: `highestaudio` });
  const video = ytdl(ref, { quality: `highestvideo` });

  const ffmpegProcess = cp.spawn(
    processor,
    videoProcessingArgs,
    videoProcessingOptions
  );

  // ffmpegProcess.stdio[3].on("data", (chunk) => {
  //   logUpdate(chunk.toString());
  // });

  ffmpegProcess.on("close", () => {
    console.log(`${title} has downloaded as video.`);
  });

  audio.pipe(ffmpegProcess.stdio[4]);
  video.pipe(ffmpegProcess.stdio[5]);

  return filePath;
};

module.exports = { processAudio, processVideo };
