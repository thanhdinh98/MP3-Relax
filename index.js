require('dotenv').config();
const mp3 = require('./ZingMp3');
const {spawn} = require('child_process');
const PATH = process.env.PATH || '';

module.exports = async (id)=>{
    const url = `https://mp3.zing.vn/xhr/media/get-list?op=top100&start=0&length=100&id=${id}`;

    const songOptions = {
        link: true
    }

    const fileOptions = {
        ext: 'play'
    }

    let fileName = 'data';
    try{
        if(fileOptions.fileName){
            fileName = fileOptions.fileName;
        }
        await mp3(url, songOptions, fileOptions);
        const ls = spawn('mpv', ['--no-video', `--playlist=${PATH}ZingMp3/${fileName}.txt`]);


        ls.stdout.on('data', (data)=>{
            console.log(data.toString());
        });

        ls.stderr.on('data', (data) => {
            process.stdout.write('\033c');
            console.log(data.toString());
        });

    }catch(err) { throw err; }

};