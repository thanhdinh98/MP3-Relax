const mp3 = require('./ZingMp3');
const ora = require('ora')();
const readline = require('readline');
const {fancyTimeFormat, log, clearScreen} = require('./utils');
const mpv = require('./Node-MPV');

const mpvPlayer = new mpv({
    'audio_only': true
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'INPUT> '
});

module.exports = async (id, path)=>{
    const url = `https://mp3.zing.vn/xhr/media/get-list?op=top100&start=0&length=100&id=${id}`;
    let spinner= '';

    const songOptions = {
        link: true
    }

    const fileOptions = {
        ext: 'play',
        path,
        fileName: 'data'
    }

    try{

        spinner = ora.start('Fetching...');
        await mp3(url, songOptions, fileOptions);
        spinner.succeed('Success');

        await mpvPlayer.start();
        await mpvPlayer.loadPlaylist(`${path}/${fileOptions.fileName}.txt`);

    }catch(err) { 
        spinner.fail('Fetching failed!')
        throw err; 
    }
};

rl.on('line', (line)=>{
    switch (line.trim()) {
        case 'pause': mpvPlayer.pause();
            break;

        case 'resume': mpvPlayer.resume();
            break;

        case 'next': {
            clearScreen();
            mpvPlayer.next();
            break;
        }
        
        case 'prev': {
            clearScreen();
            mpvPlayer.prev();
            break;
        }
        default:
      }

      readline.moveCursor(process.stdout, 0, -1);
      rl.prompt();
});

rl.on('close', ()=>{
    mpvPlayer.quit();
    console.log('Have a nice day!');
    process.exit(0);
});

// mpvPlayer.on('timeposition', ()=>{
//     mpvPlayer.getTimeRemaining().then((data)=>{
//         readline.cursorTo(process.stdout, 0);
//         process.stdout.write(fancyTimeFormat(data));
//     }); 
// });

mpvPlayer.on('started', async ()=>{
    try{
        const data = await mpvPlayer.getMetadata();
        log(data);

        rl.prompt();
    }catch(err) {throw err;}
});