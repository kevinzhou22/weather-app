import { emit } from './events';

const eventsEmitted = {
  CITY_SEARCHED: 'citySearched',
};

const searchCityInput = document.querySelector('.search-bar input');
const weatherInformationCard = document.querySelector('.weather-information-card');
const weatherLocation = weatherInformationCard.querySelector('.location');
const weatherTemperature = weatherInformationCard.querySelector('.temperature');
const weatherFeelsLikeTemperature = weatherInformationCard.querySelector('.feels-like-temperature');
const weatherType = weatherInformationCard.querySelector('.weather-type');
const content = document.querySelector('.content');

/* Fires an event representing the user attempting to display
the weather for a given city */
const notifyCitySearched = function searchCity(location) {
  const eventData = {
    location,
  };

  emit(eventsEmitted.CITY_SEARCHED, eventData);
};

/* callback function that activates searchCity when the search city button
is clicked */
const onClickOfSearchCityButton = function onClickOfSearchCityButton() {
  const location = searchCityInput.value;
  notifyCitySearched(location);
  searchCityInput.value = '';
};

/* callback function that activates searchCity the user clicks
enter while in the input */
const onKeydownWhileUsingSearchCityInput = function onKeydownWhileUsingSearchCityInput(e) {
  if (e.key !== 'Enter') return;
  const location = searchCityInput.value;
  notifyCitySearched(location);
  searchCityInput.value = '';
};

document
  .querySelector('.search-bar .search-city-button')
  .addEventListener('click', onClickOfSearchCityButton);

document
  .querySelector('.search-bar input')
  .addEventListener('keydown', onKeydownWhileUsingSearchCityInput);

// updates the location on the weather information card
const setWeatherLocation = function setWeatherLocation(location) {
  weatherLocation.textContent = location;
};

// updates the temperature on the weather information card
const setWeatherTemperature = function setWeatherTemperature(temperature) {
  weatherTemperature.textContent = String(temperature);
};

// updates the feels like temperature on the weather information card
const setWeatherFeelsLikeTemperature = function setWeatherFeelsLikeTemperature(temperature) {
  weatherFeelsLikeTemperature.textContent = String(temperature);
};

// updates the weather type on the weather information card
const setWeatherType = function setWeatherType(type) {
  weatherType.textContent = type;
};

// sets background image of page
const setBackgroundImage = function setBackgroundImage(url) {
  content.style.backgroundImage = `url(${url})`;
};

export {
  setWeatherLocation,
  setWeatherTemperature,
  setWeatherFeelsLikeTemperature,
  setWeatherType,
  setBackgroundImage,
  eventsEmitted,
};
