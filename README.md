# Deoxys CLI

A high quality Youtube content handler tool.

## Getting started

Deoxys is a complete Node.js console application that processes Youtube contents as audio or video.

### Installation

At first, <a href="https://nodejs.org/en/">NPM and Node.js</a> have to be installed on system.

### Windows

There's no need to use any shell, can be directly downloaded and installed by executable file.

### MacOS

`$ brew install node`

### For Ubuntu / Debian (and derivatives) Users

`$ sudo apt-get install nodejs`
<br />
or
<br />
`$ sudo apt install nodejs`

### For Arch (and derivatives) Users

`$ sudo pacman -S nodejs`
<br />
or
<br />
`$ sudo pamac install nodejs`

### Running

Clone the repository with `$ git clone https://github.com/efefurkankarakaya/deoxys-cli` then enter the directory with `cd deoxys-cli`.

Install the project dependency files via `npm install`, after the installation completed run the application with parameters as example below given.

### Parameters

```-V, --version    output the version number
 -a, --audio      Enable audio processing
 -v --video       Enable video processing
 -c, --clipboard  Copy the save location to the clipboard (for single processing)
 -u, --url <url>  Single URL (e.g. https://youtu.be/G8qmNGepp3k)
 -l, --list <file> List of URLs (e.g. musics.txt)
 -h, --help       Display help
```

## Example Usage

Downloading an audio by giving single URL and copy download location to clipboard

`$ node main.js -a -c -u "https://www.youtube.com/watch?v=<video_id>"`

Downloading a video by giving single URL

`$ node main.js -v -c -u "https://www.youtube.com/watch?v=<video_id>"`

Downloading audios by reading links from file

`$ node main.js -a -l musics.txt`

Downloading videos by reading links from file

`$ node main.js -v -l musics.txt`

Downloading audios and videos by reading links from file

`$ node main.js -a -v -l musics.txt`

### Example File Content

`musics.txt`

```
https://youtu.be/G8qmNGepp3k
https://www.youtube.com/watch?v=DzsH_jCjCDI
```
