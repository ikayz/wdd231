const currentTemp = document.querySelector('#current-weather-body');
const weatherForecast = document.querySelector('#weather-forecast-body');

const apiKey = 'dc6267c2fdea4f59377f61f4b6a2c91a';
const lat = -15.4167; // Lusaka Latitude
const lon = 28.2833; // Lusaka Longitude

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function apiFetch() {
  try {
    const [weatherResponse, forecastResponse] = await Promise.all([
      fetch(url),
      fetch(forecastUrl),
    ]);

    if (weatherResponse.ok && forecastResponse.ok) {
      const weatherData = await weatherResponse.json();
      const forecastData = await forecastResponse.json();
      displayResults(weatherData);
      displayForecast(forecastData);
    } else {
      throw Error(await weatherResponse.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayResults(data) {
  currentTemp.innerHTML = '';

  const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  let desc = data.weather[0].description;

  const weatherInfo = document.createElement('div');
  weatherInfo.classList.add('current-weather-info');

  weatherInfo.innerHTML = `
    <img src="${iconsrc}" alt="${desc}">
    <div class="weather-details">
      <p><strong>${Math.round(data.main.temp)}&deg;C</strong></p>
      <p style="text-transform: capitalize;">${desc}</p>
      <p>High: ${Math.round(data.main.temp_max)}&deg;</p>
      <p>Low: ${Math.round(data.main.temp_min)}&deg;</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString(
        'en-US',
        { hour: 'numeric', minute: '2-digit' }
      )}</p>
      <p>Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString(
        'en-US',
        { hour: 'numeric', minute: '2-digit' }
      )}</p>
    </div>
  `;

  currentTemp.appendChild(weatherInfo);
}

function displayForecast(data) {
  weatherForecast.innerHTML = '';

  // Filter the list for noon forecasts (approximate daily)
  const dailyForecast = data.list
    .filter(item => item.dt_txt.includes('12:00:00'))
    .slice(0, 3);

  dailyForecast.forEach((day, index) => {
    const date = new Date(day.dt * 1000);
    const dayName =
      index === 0
        ? 'Today'
        : date.toLocaleDateString('en-US', { weekday: 'long' });
    const temp = Math.round(day.main.temp);
    const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
    const desc = day.weather[0].description;

    const dayElement = document.createElement('div');
    dayElement.classList.add('forecast-day');
    dayElement.innerHTML = `
      <span>${dayName}</span>
      <img src="${icon}" alt="${desc}" width="40" height="40">
      <span>${temp}&deg;C</span>
    `;

    weatherForecast.appendChild(dayElement);
  });
}

apiFetch();
