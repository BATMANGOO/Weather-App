import { getAnimatedIcon, toCelFah } from '../utils/utils';

const $currentIcon = document.querySelector('.current__icon');
const $currentSummary = document.querySelector('.current__summary');
const $tempNum = document.querySelector('.current__temp-num');
const $windSpeed = document.querySelector('.current__wind span');
const $humidity = document.querySelector('.current__humidity span');
const $precipitation = document.querySelector('.current__precipitation span');

let currentWeather;
let unit = 'us';

export const setCurrentWeather = newWeather => {
  currentWeather = newWeather;
  // console.log(currentWeather);
  render();
}

const render = _ => {
  $currentIcon.innerHTML = getAnimatedIcon(currentWeather.icon);
  $currentSummary.textContent = currentWeather.summary;
  $windSpeed.textContent = Math.round(currentWeather.windSpeed);
  $humidity.textContent = Math.round(currentWeather.humidity * 100);
  $precipitation.textContent = Math.round(currentWeather.precipProbability * 100);
  $tempNum.innerHTML = `${toCelFah(currentWeather.temperature, unit)}&#176;`
}