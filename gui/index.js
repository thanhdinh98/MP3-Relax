const blessed = require('blessed');

const screen = blessed.screen({
  title: 'MP3',
  smartCSR: true,
});

const GUI = component => options => component({
  ...options,
  parent: screen,
});

const infoBox = GUI(blessed.box)({
  width: '50%',
  height: 10,
  label: 'Info',
  border: 'line',
});

const statusBox = GUI(blessed.box)({
  width: '50%',
  height: '20%',
  right: 0,
});

const playbackBox = GUI(blessed.box)({
  width: '50%',
  height: 3,
  top: 10,
  label: 'Playback',
  border: 'line',
});

const inputBox = GUI(blessed.textbox)({
  label: 'Input',
  width: '50%',
  height: 3,
  border: 'line',
  top: 13,
  inputOnFocus: true,
});

module.exports = {
  infoBox,
  statusBox,
  playbackBox,
  inputBox,
  screen,
};
