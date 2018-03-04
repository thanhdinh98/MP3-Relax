const moduleFunctions = require(`./nhaccuatui_module_functions`)();

const crawler = ()=>{

    function getUrl(url){
        moduleFunctions.get_songs(url)
        .then(moduleFunctions.get_single_song)
        .catch(moduleFunctions.error);
    }

    return{
        get_url: getUrl
    }
};

module.exports = crawler;