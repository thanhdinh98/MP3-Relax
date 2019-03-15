const mp3 = require('./ZingMp3');
const ora = require('ora')();
const readline = require('readline');
const {spawn} = require('child_process');

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

        const ls = spawn('mpv', ['--no-video', `--playlist=${path}/${fileOptions.fileName}.txt`]);

        ls.stdout.on('data', (data)=>{
            process.stdout.write(data.toString());
        });

        ls.stderr.on('data', (data) => {
            readline.moveCursor(process.stdout, 0, -1);
            process.stdout.write(data.toString());
        });

    }catch(err) { 
        spinner.fail('Fetching failed!')
        throw err; 
    }
};