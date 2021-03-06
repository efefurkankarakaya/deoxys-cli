const fs = require('fs');
const deoxys = require('commander');
const { processAudio, processVideo } = require('./stream');
const { createDownloadPath, copyPathToClipboard } = require('./paths');

createDownloadPath();

deoxys
  .version('1.1.0')
  .description('A high quality Youtube content handler tool');

deoxys
  .option('-a, --audio', 'Enable audio processing')
  .option('-v --video', 'Enable video processing')
  .option(
    '-c, --clipboard',
    'Copy the save location to the clipboard (for single processing).'
  )
  .option('-u, --url <url>', 'The url of the video or audio stream')
  .option('-l, --list <file.txt>', 'The file contains list of urls.')
  .parse();

const { audio, video, clipboard, url, list } = deoxys.opts();
console.log(deoxys.opts());
console.log(audio, video, clipboard, url, list);

(async () => {
  if (!url && !list) {
    console.log('Please provide a url or a file.');
    return;
  }

  if (url && list) {
    console.log('Please provide only a url or a file, not both.');
  }

  if (url) {
    await handleURL(url);
    return;
  }

  if (list) {
    console.log('Clipboard is disabled due to list processing.');
    await handleFile(list);
    return;
  }
})();

async function handleFile(list) {
  console.log('Read file.');
  const file = fs.readFileSync(list, 'utf8');
  const parsedContent = file.split('\n');
  const numberOfURLs = parsedContent.length;
  const data =
    parsedContent[numberOfURLs - 1] != ''
      ? parsedContent.slice(0, parsedContent.length)
      : parsedContent.slice(0, parsedContent.length - 1);
  console.log();
  console.log(data);
  if (!audio && !video) {
    console.log('Please provide at least one of the stream options.');
    return;
  }

  for (const url of data) {
    console.log(url);
    if (audio) {
      filePath = await processAudio(url);
    }
    if (video) {
      filePath = await processVideo(url);
    }
  }
  console.log('File handler has done the job.');
  return;
}

async function handleURL(url) {
  if (!audio && !video) {
    console.log('Please provide at least one of the stream options.');
    return;
  }
  if (audio) {
    filePath = await processAudio(url);
  }
  if (video) {
    filePath = await processVideo(url);
  }
  if (clipboard) {
    if (audio && video) {
      console.log('Clipboard is disabled.');
      return;
    }
    copyPathToClipboard(filePath);
    console.log('Copied to clipboard.');
  }
}
