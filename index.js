const _ = require('lodash');
const mp3 = require('./ZingMp3');
const MPV = require('./Node-MPV');
const { fancyTimeFormat, setContent, setInfoContent } = require('./utils');
const {
  screen, inputBox, statusBox, playbackBox,
} = require('./gui');

const mpvPlayer = new MPV({
  audio_only: true,
});

const formatLog = (data) => {
  if (_.isEmpty(data)) {
    throw new Error('Data format is invaild!');
  }

  const result = [];
  for (const key in data) {
    if (_.has(data, key)) {
      result.push(`${key}: ${data[key]}`);
    }
  }
  return result;
};

const getPlayListMp3 = async (id, path) => {
  try {
    const songs = await mp3.getSongs(id, {
      link: true,
    });
    return mp3.saveAsPlaylist(songs, {
      path,
      fileName: 'music',
    });
  } catch (err) {
    throw err;
  }
};

module.exports = async (id, path) => {
  screen.render();

  try {
    setContent('Fetching data...', statusBox);
    await getPlayListMp3(id, path);
    setContent('', statusBox);

    await mpvPlayer.start();
    setContent('Loading...', statusBox);
    await mpvPlayer.loadPlaylist(`${path}/music.txt`);
  } catch (err) {
    throw err;
  }
};

// mpvPlayer events

mpvPlayer.on('started', async () => {
  inputBox.focus();
  setContent('', statusBox);

  try {
    const data = await mpvPlayer.getMetadata();
    setInfoContent(formatLog(data));
  } catch (err) {
    throw err;
  }
});

mpvPlayer.on('timeposition', async () => {
  try {
    const data = await mpvPlayer.getTimeRemaining();
    setContent(fancyTimeFormat(data), playbackBox);
  } catch (err) { throw err; }
});

// inputBox events

inputBox.on('submit', (input) => {
  setContent('', statusBox);

  switch (input.trim()) {
    case 'pause': {
      mpvPlayer.pause();
      setContent('Pause', statusBox);
      break;
    }
    case 'resume': {
      mpvPlayer.resume();
      setContent('', statusBox);
      break;
    }
    case 'next': {
      mpvPlayer.next();
      setContent('Loading...', statusBox);
      break;
    }
    case 'prev': {
      mpvPlayer.prev();
      setContent('Loading...', statusBox);
      break;
    }
    default:
      setContent('Input is invaild!', statusBox);
  }

  inputBox.focus();
  screen.render();
});

inputBox.key('enter', () => {
  inputBox.submit();
  inputBox.clearValue();
  screen.render();
});

// screen events

screen.key('C-c', () => {
  if (!_.isUndefined(mpvPlayer)) {
    mpvPlayer.quit();
  }
  console.log('Have a nice day!');
  process.exit(0);
});

screen.key('s', () => {
  inputBox.focus();
});
