const nhaccuatui = require(`./nhaccuatui_module`)();
const setup = require(`../Setup`);

const options = {
    path: setup.setup_link.nhaccuatui.file_path,
    name_file: setup.setup_link.nhaccuatui.file_name,
    download: setup.setup_link.nhaccuatui.download
};

nhaccuatui.get_url(setup.setup_link.nhaccuatui.nhaccuatui_url, options, setup.setup_music_infos);