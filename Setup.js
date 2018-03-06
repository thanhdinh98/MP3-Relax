/*
Links for crawling:

mp3.zing.vn:

nhaccuatui.com:

*/

module.exports = (function Setup(){

    return {
        setup_link: {
            mp3: {
                mp3_url: `https://mp3.zing.vn/xhr/media/get-list?op=top100&start=0&length=100&id=ZWZB969E`,
                file_path: `zingmp3_crawler/`,
                file_name: `data`
            },
            nhaccuatui: {
                nhaccuatui_url: `https://www.nhaccuatui.com/flash/xml?html5=true&key2=76d4274f8557249cfe855043bb500f11`,
                file_path: `nhaccuatui_crawler/`,
                file_name: `data`,
                download: false
            }
        },
        
        setup_music_infos: {
            id: true,
            title: true,
            link: true,
            artists: true,
            lyric: true,
            thumbnail: true
        }
    }
})();