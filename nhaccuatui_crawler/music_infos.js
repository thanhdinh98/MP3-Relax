const Setup = require(`../Setup`);

function musicInfos(jbody, i){

    const music = {};

    if(Setup.setup_music_infos.id){
        music.id = jbody.tracklist.track[i].key._cdata;
    }
    if(Setup.setup_music_infos.title){
        music.title = jbody.tracklist.track[i].title._cdata;
    }
    if(Setup.setup_music_infos.artists){
        music.artists = jbody.tracklist.track[i].creator._cdata;
    }
    if(Setup.setup_music_infos.lyric){
        music.lyric = jbody.tracklist.track[i].lyric._cdata;
    }
    if(Setup.setup_music_infos.thumbnail){
        music.thumbnail = jbody.tracklist.track[i].avatar._cdata;
    }
    if(Setup.setup_music_infos.link){
        music.link = jbody.tracklist.track[i].location._cdata;
    }

    return music;
}

module.exports = musicInfos;