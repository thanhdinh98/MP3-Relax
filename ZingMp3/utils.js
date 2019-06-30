const requestPromise = require('request-promise');
const fsPromise = require('fs').promises;

const rOptions = url => ({
  method: 'GET',
  uri: url,
  gzip: true,
});

const fetchData = async (url) => {
  try {
    const responseList = await requestPromise(rOptions(url));
    return JSON.parse(responseList);
  } catch (err) {
    throw err;
  }
};

const getItems = list => list.data.items;
const getItem = song => song.data;
const formatData = data => JSON.stringify(data, null, 4);

const writeData = (path, fileName, data) => {
  try {
    return fsPromise.writeFile(`${path}/${fileName}`, data);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  fetchData,
  getItem,
  getItems,
  formatData,
  writeData,
};
