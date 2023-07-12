let platform = require('os').platform();

if(platform == `win32`) platform = `win`

const archString = process.arch.startsWith(`x`) ? process.arch.slice(1) : process.arch;

let file = platform + archString;

console.log(`System platform ${platform}; file name will be ${file}`);
console.log(`App data location: ${global.configPath}`);

const s = require('os').platform() == `win32` ? `\\` : `/`

const downloadPath = `${global.configPath}${s}ffmpeg-${file}`;

const fs = require('fs')

if(fs.existsSync(downloadPath) && !fs.existsSync(require('path').join(downloadPath + '/'))) {
    console.log(`Not a directory. Removing.`)
    fs.unlinkSync(downloadPath)
}

module.exports = {
    platform, file, path: downloadPath, downloadPath, systemPath: require(`which`).sync(`ffmpeg`, {nothrow: true}), getPath: () => {
        let systemPath = require(`which`).sync(`ffmpeg`, {nothrow: true});

        if(require('fs').existsSync(downloadPath)) {
            return downloadPath + s + require('fs').readdirSync(downloadPath)[0] + s + `bin` + s + `ffmpeg${require('os').platform() == `win32` ? `.exe` : ``}`
        } else if(systemPath) {
            return systemPath
        } else {
            return null
        }
    }, getFFprobe: () => {
        let systemPath = require(`which`).sync(`ffprobe`, {nothrow: true});

        if(require('fs').existsSync(downloadPath)) {
            return downloadPath + s + require('fs').readdirSync(downloadPath)[0] + s + `bin` + s + `ffprobe${require('os').platform() == `win32` ? `.exe` : ``}`
        } else if(systemPath) {
            return systemPath
        } else {
            return null
        }
    }
};