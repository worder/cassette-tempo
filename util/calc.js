export const timeToSec = value => {
  const num = n => Number(n, 10);
  let res = /^(\d+):([0-59]+):?([0-59]+)?$/.exec(value);
  if (res) {
    let [hour, min, sec] = [0, 0, 0];
    if (typeof res[3] === 'undefined') {
      [, min, sec] = res;
    } else {
      [, hour, min, sec] = res;
    }

    return num(hour) * 60 * 60 + num(min) * 60 + num(sec);
  }

  res = /^(\d+)$/.exec(value);
  if (res) {
    return num(value) * 60;
  }

  return false;
};

export const roundTwoDigitsPrecision = val => Math.round(val * 100) / 100;
export const leadingZero = num => (num >= 0 && num < 10 ? `0${num}` : `${num}`);
export const leadingPlus = num => (num > 0 ? `+${num}` : num);
