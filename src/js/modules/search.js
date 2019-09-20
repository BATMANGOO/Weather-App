'use strict';
import { setCurrentWeather } from './current';
import { fahToKel } from '../utils/utils';

const GEOCODE_KEY = 'AIzaSyDjojPV5hBjIQjoanGEKfKZNUsi-1_wkws';
const DARK_SKY_KEY = 'bcaec5b41a56835176be8a81364f0c3c';
const CORS = 'https://cors-anywhere.herokuapp.com';
let address = 'Chicago, IL';

const $searchForm = document.querySelector('.search__form');
const $searchInput = document.querySelector('.search__input');
const $searchCity = document.querySelector('.search__city');
const $spinnerWrapper = document.querySelector('.spinner-wrapper');

export const initializeSearch = _ => {
    console.log('this is working');
    bindSearchEvents();
    updateWeather(address);
}

const bindSearchEvents = () => {
    $searchForm.addEventListener('submit', e => {
    e.preventDefault();
    $searchInput.classList.toggle('search__input--open');
    $searchInput.focus();
    if ($searchInput.value === '') return;
    address = $searchInput.value;
    $searchInput.value = '';
    updateWeather(address);
    render();
  });
};

const updateWeather = async query => {
    const {lat, lng} = await getLatLng(address);
    const weatherData = await getWeatherData(lat, lng);
    const weatherCurrent = weatherData.currently;
    weatherCurrent.temperature = fahToKel(weatherCurrent.temperature);
    console.log(weatherCurrent);
    setCurrentWeather(weatherCurrent);
};

const getWeatherData = async(lat, lng) => {
    const reqLink = `${CORS}/https://api.darksky.net/forecast/${DARK_SKY_KEY}/${lat},${lng}`;
  const fetchData = await fetch(reqLink);
  const parsed = await fetchData.json();

  return parsed;
}

const getLatLng = async query => {
    const reqLink = `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${GEOCODE_KEY}`
  const fetchData = await fetch(reqLink);
  const parsed = await fetchData.json();
  const latlng = {
      lat: parsed.results[0].geometry.location.lat,
      lng: parsed.results[0].geometry.location.lng
  }
  return latlng;
}

const render = _ => {
  $searchCity.innerHTML = address;
}