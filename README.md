Replace the url in Setup_links.js file with the url that you want to crawl infromations from the sites. 

For crawling informations from mp3.zing.vn, run with method: npm run mp3.

For crawling informations from nhaccuatui.com, run with method: npm run nhaccuatui.

To download all the songs from nhaccuatui's url, visit nhaccuatui_crawler/nhaccuatui_module_functions.js for detail.

Note: Setup your download location in your default browser before downloading the songs.

Methods:

get_url(url, options);
    url: String
    options: Object
        path: String
        name_file: String
    