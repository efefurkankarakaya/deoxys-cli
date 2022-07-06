const {
  processor,
  audioProcessingArgs,
  audioProcessingOptions,
  videoProcessingArgs,
  videoProcessingOptions,
} = require('./config');

const { downloadPath } = require('./paths');

const cp = require('child_process');
const fs = require('fs');
const ytdl = require('ytdl-core');
const logUpdate = require('log-update');

const processAudio = async (ref) => {
  const title = (await ytdl.getInfo(ref)).videoDetails.title;
  const fileExtension = '.mp3';
  const fileName = title + fileExtension;
  const filePath = downloadPath + '/' + fileName;
  if (fs.existsSync(filePath)) {
    console.log(`${fileName} already exists.`);
    return filePath;
  }
  audioProcessingArgs[audioProcessingArgs.length - 1] = filePath;

  return new Promise((resolve, reject) => {
    console.log(`${title} has started to being downloaded.`);

    const audio = ytdl(ref, { quality: `highestaudio` });

    const ffmpegProcess = cp.spawn(
      processor,
      audioProcessingArgs,
      audioProcessingOptions
    );

    ffmpegProcess.stdio[3].on('data', (chunk) => {
      const lines = chunk.toString().trim().split('\n');
      const args = {};
      for (const line of lines) {
        const [key, value] = line.split('=');
        args[key.trim()] = value.trim();
      }
      const speed = (Number(args['bitrate'].split('kbits/s')[0]) * 125) / 1024;
      const downloaded = args['total_size'] / 1024 / 1024;
      const output = `Download Speed: ${speed} Kb/s\nDownloaded: ${downloaded} MB`;
      logUpdate(output);
    });

    ffmpegProcess.on('close', () => {
      console.log(`${title} has downloaded as audio.`);
      resolve(filePath);
    });

    audio.pipe(ffmpegProcess.stdio[4]);

    // return filePath;
  });
};

const processVideo = async (ref) => {
  const title = (await ytdl.getInfo(ref)).videoDetails.title;
  const fileExtension = '.mp4';
  const fileName = title + fileExtension;
  const filePath = downloadPath + '/' + fileName;
  if (fs.existsSync(filePath)) {
    console.log(`${fileName} already exists.`);
    return filePath;
  }
  videoProcessingArgs[videoProcessingArgs.length - 1] = filePath;

  return new Promise((resolve, reject) => {
    console.log(`${title} has started to being downloaded.`);

    const audio = ytdl(ref, { quality: `highestaudio` });
    const video = ytdl(ref, { quality: `highestvideo` });

    const ffmpegProcess = cp.spawn(
      processor,
      videoProcessingArgs,
      videoProcessingOptions
    );

    ffmpegProcess.stdio[3].on('data', (chunk) => {
      const lines = chunk.toString().trim().split('\n');
      const args = {};
      for (const line of lines) {
        const [key, value] = line.split('=');
        args[key.trim()] = value.trim();
      }
      const speed = (Number(args['bitrate'].split('kbits/s')[0]) * 125) / 1024;
      const downloaded = args['total_size'] / 1024 / 1024;
      const output = `Download Speed: ${speed} Kb/s\nDownloaded: ${downloaded} MB`;
      logUpdate(output);
    });

    ffmpegProcess.on('close', () => {
      console.log(`${title} has downloaded as video.`);
      resolve(filePath);
    });

    audio.pipe(ffmpegProcess.stdio[4]);
    video.pipe(ffmpegProcess.stdio[5]);
  });
};

module.exports = { processAudio, processVideo };
