const mp3 = require('./ZingMp3');
const ora = require('ora')();
const readline = require('readline');
// const {spawn} = require('child_process');
const mpv = require('./Node-MPV');
const mpvPlayer = new mpv({
    'audio_only': true
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

        mpvPlayer.getMetadata().then((data) =>{
            const log = {};
            if(data.title) log.title = data.title;
            if(data.artist) log.artists = data.artist;
            if(data.album) log.album = data.album;

            for(let key in log){
                console.log(`${key}: ${log[key]}`);
            }
        });

        mpvPlayer.on('timeposition', ()=>{
            mpvPlayer.getTimePosition().then((data)=>{
                readline.cursorTo(process.stdout, 0);
                process.stdout.write(data.toString());
            }); 
        });

        // const ls = spawn('mpv', ['--no-video', `--playlist=${path}/${fileOptions.fileName}.txt`]);

        // ls.stdout.on('data', (data)=>{
        //     process.stdout.write(data.toString());
        // });

        // ls.stderr.on('data', (data) => {
        //     readline.moveCursor(process.stdout, 0, -1);
        //     process.stdout.write(data.toString());
        // });

    }catch(err) { 
        spinner.fail('Fetching failed!')
        throw err; 
    }
};