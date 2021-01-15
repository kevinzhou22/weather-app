import getWeatherData from './weather-data';
import { on } from './events';
import {
  setWeatherLocation,
  setWeatherTemperature,
  setWeatherFeelsLikeTemperature,
  setWeatherType,
  setBackgroundImage,
  eventsEmitted as domControllerEventsEmitted,
} from './dom-controller';

import clearImage from '../images/clear.jpg';
import cloudsImage from '../images/clouds.jpg';
import drizzleImage from '../images/drizzle.jpg';
import rainImage from '../images/rain.jpg';
import snowImage from '../images/snow.jpg';
import thunderstormImage from '../images/thunderstorm.jpg';
import weatherVaneImage from '../images/weather-vane.jpg';

// converts Kelvin to Fahrenheit (rounding to the first decimal place)
const convertKelvinToFahrenheit = function convertKelvinToFahrenheit(kelvin) {
  const fahrenheit = (kelvin - 273.15) * (9 / 5) + 32;
  const intermediateCalculationValue = Math.round(Number(`${fahrenheit}e+1`));
  const roundedFahrenheit = Number(`${intermediateCalculationValue}e-1`);
  return roundedFahrenheit;
};

/* takes a single string representing the weather category as an argument
and returns the associated background image URL */
const getImageURLFromWeatherType = function getImageURLFromWeatherType(type) {
  let url;
  switch (type) {
    case 'thunderstorm':
      url = thunderstormImage;
      break;
    case 'drizzle':
      url = drizzleImage;
      break;
    case 'rain':
      url = rainImage;
      break;
    case 'snow':
      url = snowImage;
      break;
    case 'clear':
      url = clearImage;
      break;
    case 'clouds':
      url = cloudsImage;
      break;
    default:
      url = weatherVaneImage;
  }
  return url;
};

// callback function for responding to CITY_SEARCHED events from the dom-controller module
const onCitySearched = async function onCitySearched(eventData) {
  const weatherData = await getWeatherData(eventData.location);
  if (weatherData === null) return;
  const {
    weatherCategory,
    weatherDescription,
    temperature: temperatureInKelvin,
    feelsLikeTemperature: feelsLikeTemperatureInKelvin,
    cityName,
    countryCode,
  } = weatherData;

  const temperatureInFahrenheit = convertKelvinToFahrenheit(temperatureInKelvin);
  const feelsLikeTemperatureInFahrenheit = convertKelvinToFahrenheit(feelsLikeTemperatureInKelvin);
  const backgroundImageURL = getImageURLFromWeatherType(weatherCategory);

  setWeatherLocation(`${cityName}, ${countryCode}`);
  setWeatherTemperature(String(temperatureInFahrenheit));
  setWeatherFeelsLikeTemperature(String(feelsLikeTemperatureInFahrenheit));
  setWeatherType(weatherDescription);
  setBackgroundImage(backgroundImageURL);
};

on(domControllerEventsEmitted.CITY_SEARCHED, onCitySearched);
