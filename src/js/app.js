import './../scss/main.scss';
import { initializeSearch } from './modules/search';
import { bindMultiEvents } from './modules/multi';
import { bindUnitEvents } from './modules/units';

initializeSearch();
bindMultiEvents();
bindUnitEvents();
