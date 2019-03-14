const {getListSong, getSongFromList, save} = require('./functions');
const {getItems} = require('./utils');

module.exports = async (baseUrl, songOptions, fileOptions)=>{

    const url = baseUrl;

    try{
        const list = await getListSong(url);
        const songs = await getSongFromList(getItems(list));
        await save(songs, songOptions, fileOptions);
    }catch(err){ throw err; }
};