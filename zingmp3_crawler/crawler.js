const mp3 = require(`./mp3_module`)();
const link = require(`../Setup_links`);

mp3.get_url(link.mp3_url, {path: `zingmp3_crawler/`, name_file: `data`});