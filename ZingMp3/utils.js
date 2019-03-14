const fsPromise = require('fs').promises;
const _ = require('lodash');

module.exports.getItems = (list)=>{
    return list.data.items;
}

module.exports.setupInfo = (song , options)=>{
    const resultSong = {};

    if(options.id)  resultSong.id = song.id;
    if(options.title)   resultSong.title = song.title;
    if(options.lyric)   resultSong.lyric = song.lyric;
    if(options.artists) resultSong.artists = song.artists_names
    if(options.thumbnail)   resultSong.thumbnail = song.thumbnail;
    if(options.link)    resultSong.link = song.source['128'];

    return resultSong;
}

module.exports.writeToFile = async (songs, options)=>{
    try{

        if(!_.isEmpty(options)){

            let fileName = 'data';

            if(options.fileName) fileName = options.fileName;
            switch(options.ext){
                case 'json': {
                    fileName += '.json';
                    await fsPromise.writeFile(
                        options.path + fileName,
                        JSON.stringify(songs, null, 4)
                    );
                    break;
                }

                case 'txt':{
                    fileName += '.txt';
                    await fsPromise.writeFile(
                        options.path + fileName,
                        songs.toString()
                    );
                    break;
                }

                case 'play':{
                    fileName += '.txt';
                    const onlyLink = [];
                    let onlyLinkStr = '';

                    for(let song of songs){
                        onlyLink.push(song.link);
                    }
                    onlyLinkStr = onlyLink.toString()
                    .replace(/[|]/g, '')
                    .replace(/,/g, '\n')
                    .replace(/\/\//g, 'http://');

                    await fsPromise.writeFile(
                        options.path + fileName,
                        onlyLinkStr
                    );
                    break;
                }
            }

        }else{
            await fsPromise.writeFile(
                options.path + fileName,
                JSON.stringify(songs, null, 4)
            );
        }
    }catch(err) { throw err; }
}