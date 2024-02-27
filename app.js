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
function createChart(data) {
    new Chart(chartContainer, {
        type: 'bar',
        data: {
            labels: ['Temperatura', 'Sensación térmica', 'Humedad', 'Viento'],
            datasets: [{
                label: 'Valores',
                data: [data.main.temp, data.main.feels_like, data.main.humidity, data.wind.speed],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    if (city) {
        const data = await getWeatherData(city);
        if (data) {
            displayWeatherData(data);
            createChart(data);
        }
    }
});