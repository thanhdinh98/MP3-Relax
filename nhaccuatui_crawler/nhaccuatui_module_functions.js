const request = require(`request`);
const convert = require(`xml-js`);
const open = require(`opn`);
const fs = require(`fs`);

function moduleFunctions(){

    let music_data = {items: []};
    let length = 0;
    let order = 0;

    function getSongs(url){
        return new Promise((resolve, reject)=>{
            request({method: `GET`, uri: url, gzip: true}, (err, res, body)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(body);
                }
            });
        });
    }

    function getSingleSong(res){
        const result = convert.xml2json(res, {compact: true, space: 4});
        const jbody = JSON.parse(result);
        length = jbody.tracklist.track.length;
        for(let i = 0; i < jbody.tracklist.track.length; ++i){

            // This code for downloading all the songs in the link
            //open(jbody.tracklist.track[i].location._cdata); 

            /*
                For downloading the informations of all songs as json format, please uncommet the code above and comment 
                all the codes below in this function.
            */

            let music = {};
            order++;
            music.title = jbody.tracklist.track[i].title._cdata;
            music.artists = jbody.tracklist.track[i].creator._cdata;
            music.link = jbody.tracklist.track[i].location._cdata;
            music.thumb = jbody.tracklist.track[i].coverimage._cdata;
            music.order = order;
            music_data.items.push(music);
        }
        if(music_data.items.length === length){
            fs.writeFile(`nhaccuatui_crawler/data.json`, JSON.stringify(music_data, null, 4), (err)=>{
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