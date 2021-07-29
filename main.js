const deoxys = require("commander");
const { processAudio, processVideo } = require("./stream");
const { createDownloadPath, copyPathToClipboard } = require("./paths");

createDownloadPath();

deoxys.version("1.0.0").description("A high quality Youtube content handler tool");

deoxys
  .option("-a, --audio", "Enable audio processing")
  .option("-v --video", "Enable video processing")
  .option("-c, --clipboard", "Copy the save location to the clipboard (for single processing).")
  .option("-u, --url <url>", "The url of the video or audio stream")
  .parse();

console.log(deoxys.opts());

const { audio, video, clipboard, url } = deoxys.opts();
console.log(audio, video, clipboard, url);

(async () => {
  let filePath = "";
  if (!url) {
    console.log("Please provide a url.");
    return;
  }
  if (!audio && !video) {
    console.log("Please provide at least one of the stream options.");
    return;
  }
  if (audio){
    filePath = await processAudio(url);
  }
  if (video){
    filePath = await processVideo(url);
  }
  if (clipboard){
    if (audio && video) { 
      console.log("Clipboard is disabled.");
      return;
    }
    copyPathToClipboard(filePath);
  }
})();
