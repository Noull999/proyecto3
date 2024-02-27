const apiKey = 'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}'; // Replace with your OpenWeatherMap API key
const cityInput = document.getElementById('city-input');
const cityName = document.getElementById('city-name');
const weatherData = document.getElementById('weather-data');
const chartContainer = document.getElementById('chart-container');

async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=es&units=metric`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

function displayWeatherData(data) {
    cityName.textContent = data.name;
    weatherData.innerHTML = `
        <p>Temperatura: ${data.main.temp}°C</p>
        <p>Sensación térmica: ${data.main.feels_like}°C</p>
        <p>Humedad: ${data.main.humidity}%</p>
        <p>Viento: ${data.wind.speed} m/s</p>
    `;
}

