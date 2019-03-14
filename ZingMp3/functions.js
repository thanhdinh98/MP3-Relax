const requestPromise = require('request-promise');
const {setupInfo, writeToFile} = require('./utils');
const _ = require('lodash');

module.exports.getListSong = async (url)=>{
    const options = {
        method: 'GET', 
        uri: url, 
        gzip: true
    };

    try{
        const responseList = await requestPromise(options);
        return JSON.parse(responseList);
    }catch(err){ throw err; }
}

module.exports.getSongFromList = async (list)=>{

    const baseUrl = 'https://mp3.zing.vn/xhr/media/get-source?type=audio&key=';
    const songStore = [];

    for (let song of list){
        const options = {
            method: 'GET', 
            uri: `${baseUrl}${song.code}`, 
            gzip: true
        }

        try{
            const responseSong = await requestPromise(options);
            songStore.push(JSON.parse(responseSong));
        }catch(err) { throw err; }
    }

    return songStore;
}

module.exports.save = async (songs, songOptions, fileOptions)=>{

    try{
        if(!_.isEmpty(songOptions)){
            const songStore = [];
    
            for(let song of songs){
                songStore.push(setupInfo(song.data, songOptions));
            }
    
            await writeToFile(songStore, fileOptions);
            console.log('Success');
        }else{
            await writeToFile(songs, fileOptions);
            console.log('Success');
        }
    }catch (err) { throw err; }
}