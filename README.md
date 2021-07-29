# Deoxys CLI

A high quality Youtube content handler tool.

## Getting started

Deoxys is a complete Node.js console application that processes Youtube contents as audio or video. 

### Installation

At first, <a href="https://nodejs.org/en/">NPM and Node.js</a> have to be installed on system.

### Windows
There's no need to use any shell, can be directly downloaded and installed by executable file.

### MacOS
```$ brew install node```

### For Ubuntu / Debian (and derivatives) Users
```$ sudo apt-get install nodejs```
<br />
or
<br />
```$ sudo apt install nodejs```

### For Arch (and derivatives) Users
```$ sudo pacman -S nodejs```
<br />
or
<br />
```$ sudo pamac install nodejs```

### Running

Clone the repository with ```$ git clone https://github.com/efefurkankarakaya/deoxys-cli``` then enter the directory with ```cd deoxys-cli```.

Install the project dependency files via ```npm install```, after the installation completed run the application with parameters as example below given.

### Parameters

 ``` -V, --version    output the version number
  -a, --audio      Enable audio processing
  -v --video       Enable video processing
  -c, --clipboard  Copy the save location to the clipboard (for single processing).
  -u, --url <url>  The url of the video or audio stream
  -h, --help       display help for command
  ```

## Example

```$ node main.js -a -v -c -u "https://www.youtube.com/watch?v=<video_id>"```
