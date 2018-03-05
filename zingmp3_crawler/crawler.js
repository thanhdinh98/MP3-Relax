const mp3 = require(`./mp3_module`)();
const setup = require(`../Setup_links`);

mp3.get_url(setup.mp3.mp3_url, {path: setup.mp3.file_path, name_file: setup.mp3.file_name});