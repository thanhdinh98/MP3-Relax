const nhaccuatui = require(`./nhaccuatui_module`)();
const setup = require(`../Setup_links`);

nhaccuatui.get_url(setup.nhaccuatui.nhaccuatui_url, {path: setup.nhaccuatui.file_path, name_file: setup.nhaccuatui.file_name});