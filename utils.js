const {
  screen, infoBox,
} = require('./gui');

/* eslint-disable no-bitwise */
const fancyTimeFormat = (time) => {
  if (typeof (time) !== 'number') time = Number(time.toString());

  const hrs = ~~(time / 3600);
  const mins = ~~((time % 3600) / 60);
  const secs = ~~time % 60;

  let ret = '';

  if (hrs > 0) {
    ret += `${hrs}:${mins < 10 ? '0' : ''}`;
  }

  ret += `${mins}:${secs < 10 ? '0' : ''}`;
  ret += `${secs}`;
  return ret;
};

const setContent = (content, component) => {
  component.setContent('');
  component.setContent(content);
  screen.render();
};

const setInfoContent = (content) => {
  infoBox.setContent('');
  infoBox.insertTop(content);
  screen.render();
};

module.exports = {
  fancyTimeFormat,
  setContent,
  setInfoContent,
};
