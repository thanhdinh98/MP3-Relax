const _ = require('lodash');
const helper = require('./utils');

const formatData = (song, {
  id, title, lyric, artists, thumbnail, link,
}) => {
  const result = {};

  if (id) result.id = song.id;
  if (title) result.title = song.title;
  if (lyric) result.lyric = song.lyric;
  if (artists) result.artists = song.artists_names;
  if (thumbnail) result.thumbnail = song.thumbnail;
  if (link) result.link = song.source['128'];

  if (_.isEmpty(result)) {
    throw new Error('Format option is invaild!');
  }

  return result;
};

const getAllData = (id) => {
  const baseUrl = 'https://mp3.zing.vn/xhr/media/get-list?op=top100&start=0&length=100&id=';
  return helper.fetchData(`${baseUrl}${id}`);
};

const getDataFromReferencedLink = async (data) => {
  const baseUrl = 'https://mp3.zing.vn/xhr/media/get-source?type=audio&key=';
  return Promise.all(data.map(item => helper.fetchData(`${baseUrl}${item.code}`)));
};

const getSongs = async (id, options = {}) => {
  try {
    const data = await getAllData(id);
    const songs = await getDataFromReferencedLink(helper.getItems(data));
    if (!_.isEmpty(options)) {
      return songs.map(song => formatData(helper.getItem(song), options));
    }
    return songs;
  } catch (err) {
    throw err;
  }
};

const writeToFile = (songs, { path, ext = 'txt', fileName = 'data' }) => {
  if (_.isEmpty(path)) {
    throw new Error('Path is not defined!');
  }

  switch (ext) {
    case 'txt': {
      fileName += '.txt';
      break;
    }
    case 'json': {
      fileName += '.json';
      break;
    }
    default:
  }

  try {
    return helper.writeData(path, fileName, helper.formatData(songs));
  } catch (err) {
    throw err;
  }
};

const saveAsPlaylist = (songs, { path, fileName = 'data' }) => {
  let linksStr = '';

  if (_.isEmpty(path)) {
    throw new Error('Path is not defined!');
  }

  fileName += '.txt';
  const links = songs.map(song => song.link);
  linksStr = links.toString()
    .replace(/[|]/g, '')
    .replace(/,/g, '\n')
    .replace(/\/\//g, 'http://');

  try {
    return helper.writeData(path, fileName, linksStr);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getSongs,
  writeToFile,
  saveAsPlaylist,
};
