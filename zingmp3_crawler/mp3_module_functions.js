const request = require(`request`);
const fs = require(`fs`);


const mp3ModuleFunctions = ()=>{

    const mp3 = `https://mp3.zing.vn/xhr/media/get-source?type=audio&key=`;
    let music_data = {items:[]};
    let length = 0;
    let order = 0;

    function getAllSongs(url){
        return new Promise((resolve, reject)=>{
            request({ 
                method: 'GET', 
                uri: url, 
                gzip: true
            }, (err, res, body)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(body);
                }
            });
        });
    }
    
    function getSingleSong(res){
        let body = JSON.parse(res);
        length = body.data.items.length;
        for(let i = 0; i < body.data.items.length; i++){
            request({method: `GET`, uri: mp3 + body.data.items[i].code, gzip: true}, saveSong);
        }
    }
    
    function saveSong(err, res, body){
        if(err){
            console.log(err);
        }else{
            if(err){
                console.log(err);
            }else{
                order++;
                let jbody = JSON.parse(body);
                let music = {};
                music.title = jbody.data.title;
                music.artists = jbody.data.artists_names;
                music.link = jbody.data.source[`128`];
                music.id = jbody.data.id;
                music.thumb = jbody.data.thumbnail;
                music.order = order;
                music_data.items.push(music);
            }
            if(music_data.items.length === length){
                fs.writeFile(`zingmp3_crawler/data.json`, JSON.stringify(music_data, null, 4), (err)=>{
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