import R from 'ramda'

export const isEmpty = (data) => {
  return R.empty(data);
};

export const displayHours = (time) => {
  const timeVal = parseFloat(time);

  let mins = Math.round(timeVal * 60);
  let hrs = Math.floor(mins / 60);

  mins = mins % 60;
  mins = '' + mins;
  let pad = '00';
  mins = pad.substring(0, pad.length - mins.length) + mins;

  return hrs + ':' + mins;
};

export const notEmpty = (data) => {
  const type = Object.prototype.toString.call(data).slice(8, -1).toLowerCase();

  switch (type) {
    case 'null':
    case 'undefined':
      return false;
    case 'object':
      return Object.keys(data).length > 0;
    case 'array':
    case 'string':
      return data !== 'undefined' && data !== 'null' && data.length > 0;
    case 'boolean':
      return !!data;
    default:
      return true;
  }
};

export const debounce = (func, wait) => {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const trimPrice = (price) => {
  const formatted = price / 100;
  return price % 100 ? formatted.toFixed(2) : formatted;
};

export const thumbnail = (image, dimension) => {
  if (image) {
    return [image.substr(0, image.lastIndexOf('.')), `_${dimension}`, image.substr(image.lastIndexOf('.'))].join('');
  }
  return '';
};
