/* this is free and for a personal mini-project only, so it is
fine for this to be exposed. API key for OpenWeatherMap. */
const WEATHER_API_KEY = 'a8424d99c006aad91cd2f7bbd65ae592';

/* returns an object from OpenWeatherMap containing the weather data for a given city.
If the city is not found, returns null. */
const fetchWeatherDataFromAPI = async function fetchWeatherData(city, country = null) {
  const location = `${city}${country === null ? '' : `,${country}`}`;
  const searchQuery = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${WEATHER_API_KEY}`;

  const response = await fetch(searchQuery, { mode: 'cors' });

  let weatherData;
  if (response.ok) {
    weatherData = await response.json();
  } else {
    throw new Error(`HTTP-Error: ${response.status}`);
  }

  return weatherData;
};

/* contains the weather data for a given city. The constructor takes an object generated from
fetchWeatherData and extracts the necessary information */
class CityWeatherData {
  constructor(fetchedWeatherData) {
    this.weatherCategory = fetchedWeatherData.weather[0].main.toLowerCase();
    this.weatherDescription = fetchedWeatherData.weather[0].description.toLowerCase();
    // in Kelvin
    this.temperature = fetchedWeatherData.main.temp;
    // in Kelvin
    this.feelsLikeTemperature = fetchedWeatherData.main.feels_like;
    // percent
    this.humidity = fetchedWeatherData.main.humidity;
    // in meter/sec
    this.windSpeed = fetchedWeatherData.wind.speed;
    // unix, UTC
    this.dateTime = fetchedWeatherData.dt;
    this.cityName = fetchedWeatherData.name;
    this.countryCode = fetchedWeatherData.sys.country;
  }
}

/* default export of module
Returns a CityWeatherData object containing the weather data for a city
at a given moment if the city is found or null if it is not found */
const getWeatherData = async function getWeatherData(city, country = null) {
  let fetchedWeatherData;
  try {
    fetchedWeatherData = await fetchWeatherDataFromAPI(city, country);
  } catch (error) {
    if (error.message === 'HTTP-Error: 404') return null;
    throw error;
  }
  const filteredWeatherData = new CityWeatherData(fetchedWeatherData);
  return filteredWeatherData;
};

export { getWeatherData as default };
