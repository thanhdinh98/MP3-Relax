module.exports.fancyTimeFormat = (time)=>{

    if(typeof(time) !== 'number') time = Number(time.toString());

    let hrs = ~~(time / 3600);
    let mins = ~~((time % 3600) / 60);
    let secs = ~~time % 60;

    let ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

module.exports.log = (data)=>{
    const log = {};
    if(data.title) log.title = data.title;
    if(data.artist) log.artists = data.artist;
    if(data.album) log.album = data.album;

    for(let key in log){
        console.log(`${key}: ${log[key]}`);
    }
}

module.exports.clearScreen = ()=>{
    return process.stdout.write('\033c');
}