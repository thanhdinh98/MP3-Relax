const request = require(`request`);
const convert = require(`xml-js`);
const open = require(`opn`);
const fs = require(`fs`);
const appVars = require(`./appVars`);

function moduleFunctions(){

    function getSongs(url, options){
        return new Promise((resolve, reject)=>{
            request({method: `GET`, uri: url, gzip: true}, (err, res, body)=>{
                if(err){
                    reject(err);
                }else{
                    appVars.path = options.path;
                    appVars.name_file = options.name_file;
                    appVars.download = options.download;
                    resolve(body);
                }
            });
        });
    }

    function getSingleSong(res){
        const result = convert.xml2json(res, {compact: true, space: 4});
        const jbody = JSON.parse(result);
        appVars.item_length = jbody.tracklist.track.length;
        for(let i = 0; i < jbody.tracklist.track.length; ++i){

            if(appVars.donwload){
                open(jbody.tracklist.track[i].location._cdata); 
            }else{
                let music = {};
                music.title = jbody.tracklist.track[i].title._cdata;
                music.artists = jbody.tracklist.track[i].creator._cdata;
                music.link = jbody.tracklist.track[i].location._cdata;
                music.thumb = jbody.tracklist.track[i].coverimage._cdata;
                appVars.music_data.items.push(music);   
            }
        }
        if((appVars.music_data.items.length === appVars.item_length) && (!appVars.download)){
            fs.writeFile(appVars.path + appVars.name_file + `.json`, JSON.stringify(appVars.music_data, null, 4), (err)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(`Success`);
                }
            });
        }
    }

    function error(err){
        console.log(err);
    }

    return {
        get_songs: getSongs,
        get_single_song: getSingleSong,
        error: error
    }
}

module.exports = moduleFunctions;