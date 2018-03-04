const moduleFunctions = require(`./mp3_module_functions`)();

const crawler = ()=>{

    const getUrl = (url, options)=>{
        moduleFunctions.get_all_songs(url, options)
        .then(moduleFunctions.get_single_song)
        .catch(moduleFunctions.error);
    }

    return {
        get_url: getUrl
    }
};

module.exports = crawler;