const Setup = require(`../Setup`);

function musicInfos(jbody){

    const music = {};

    if(Setup.setup_music_infos.id){
        music.id = jbody.data.id;
    }
    if(Setup.setup_music_infos.title){
        music.title = jbody.data.title;
    }
    if(Setup.setup_music_infos.artists){
        music.artists = jbody.data.artists_names;
    }
    if(Setup.setup_music_infos.lyric){
        music.lyric = jbody.data.lyric;
    }
    if(Setup.setup_music_infos.thumbnail){
        music.thumbnail = jbody.data.thumbnail;
    }
    if(Setup.setup_music_infos.link){
        music.link = jbody.data.source[`128`];
    }

    return music;
}

module.exports = musicInfos;