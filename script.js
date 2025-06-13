const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherCard = document.getElementById('weatherCard');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const weatherCondition = document.getElementById('weatherCondition');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const errorMessage = document.getElementById('errorMessage');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city === '') {
        showError('Please enter a city name.');
        return;
    }

    fetch('weather.json')
        .then(response => response.json())
        .then(data => {
            if (data[city]) {
                displayWeather(city, data[city]);
            } else {
                showError('City not found in local data.');
            }
        })
        .catch(() => {
            showError('Failed to load local weather data.');
        });
});

function displayWeather(city, data) {
    errorMessage.textContent = '';
    weatherCard.style.display = 'block';

    cityName.textContent = city;
    temperature.textContent = `🌡️ ${data.temperature}°C`;
    weatherCondition.textContent = `Condition: ${data.condition}`;
    humidity.textContent = `Humidity: ${data.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind} m/s`;
}

function showError(message) {
    weatherCard.style.display = 'none';
    errorMessage.textContent = message;
}
