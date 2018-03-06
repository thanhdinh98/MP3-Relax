const mp3 = require(`./mp3_module`)();
const setup = require(`../Setup`);

const options = {
    path: setup.setup_link.mp3.file_path, 
    name_file: setup.setup_link.mp3.file_name
};

mp3.get_url(setup.setup_link.mp3.mp3_url, options, setup.setup_music_infos);