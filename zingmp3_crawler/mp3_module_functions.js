const request = require(`request`);
const fs = require(`fs`);
const appVars = require(`./appVars`);

const mp3ModuleFunctions = ()=>{

    function getAllSongs(url, options){
        return new Promise((resolve, reject)=>{
            request({ 
                method: 'GET', 
                uri: url, 
                gzip: true
            }, (err, res, body)=>{
                if(err){
                    reject(err);
                }else{
                    appVars.path = options.path;
                    appVars.name_file = options.name_file;
                    resolve(body);
                }
            });
        });
    }
    
    function getSingleSong(res){
        let body = JSON.parse(res);
        appVars.item_length = body.data.items.length;
        for(let i = 0; i < body.data.items.length; i++){
            request({method: `GET`, uri: appVars.song_url + body.data.items[i].code, gzip: true}, saveSong);
        }
    }
    
    function saveSong(err, res, body){
        if(err){
            console.log(err);
        }else{
            if(err){
                console.log(err);
            }else{
                let jbody = JSON.parse(body);
                let music = {};
                music.title = jbody.data.title;
                music.artists = jbody.data.artists_names;
                music.link = jbody.data.source[`128`];
                music.id = jbody.data.id;
                music.thumb = jbody.data.thumbnail;
                appVars.music_data.items.push(music);
            }
            if(appVars.music_data.items.length === appVars.item_length){
                fs.writeFile(appVars.path + appVars.name_file + `.json`, JSON.stringify(appVars.music_data, null, 4), (err)=>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log(`Success`);
                    }
                });
            }
        }
    }
    
    function error(err){
        console.log(err);
    }

    return{
        get_all_songs: getAllSongs,
        get_single_song: getSingleSong,
        error: error
    }
}

module.exports = mp3ModuleFunctions;