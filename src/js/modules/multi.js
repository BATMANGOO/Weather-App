import { getIcon, toCelFah } from '../utils/utils';
import { setCurrentWeather } from './current';
//DOM
const $wList = document.querySelector('.wlist');

let weatherList = [];
let unit = 'us';
let selectedIndex = 0;

export const bindMultiEvents = _ => {
  $wList.addEventListener('click', event => {
    let elem = event.target;
    while(elem && !elem.matches('.wlist__item')) {
      elem = event.target.parentElement;
    }
    const listElemIndex = [...elem.parentElement.children].indexOf(elem);
    selectedIndex = listElemIndex;
    setCurrentWeather(weatherList[listElemIndex]);
    render()
  });
};

export const setMultiWeather = newList => {
  weatherList = newList;
  render();
};

export const setMultiUnit = newUnit => {
  unit = newUnit;
  render();
}

const getDayOfWeek = dayIndex => {
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  return days[dayIndex];
};

const render = _ => {
  let markup = '';
  for (let i = 0; i < 5; i++) {
    const highTemp = weatherList[i].temperatureHigh;
    const lowTemp = weatherList[i].temperatureLow;
    const currentDayIndex = new Date(weatherList[i].time * 1000).getDay()
    markup += `
      <div class='wlist__item ${i === selectedIndex ? 'wlist__item--selected' : ''}'>
        <img src='${getIcon(weatherList[i].icon)}' class='wlist__icon'>
        <div class=''wlist__range>
          ${toCelFah(highTemp, unit)} / ${toCelFah(lowTemp, unit)}
        </div>
        <div class='wlist__day'>
          ${getDayOfWeek(currentDayIndex)}
        </div>
      </div>
    `
  }
  $wList.innerHTML = markup;
};