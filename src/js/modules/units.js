import { setCurrentUnit } from './current';
import { setMultiUnit } from './multi';
//DOM
const $fahrenheit = document.querySelector('.units__fahrenheit');
const $celcius = document.querySelector('.units__celcius');

export const bindUnitEvents = _ => {
  $fahrenheit.addEventListener('click', () => {
    setCurrentUnit('us');
    setMultiUnit('us');
    $fahrenheit.classList.add('units__fahrenheit--active');
    $celcius.classList.remove('units__celcius--active');
  });
  $celcius.addEventListener('click', () => {
    setCurrentUnit('si');
    setMultiUnit('si');
    $fahrenheit.classList.remove('units__fahrenheit--active');
    $celcius.classList.add('units__celcius--active');
  });
};