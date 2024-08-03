// Load the config file
const script = document.createElement('script');
script.src = './config.js';
document.head.appendChild(script);

script.onload = () => {
    function getWeatherByLocation() {
        const location = document.getElementById('locationInput').value;
        if (location) {
            fetchWeatherData(location);
        } else {
            alert('Please enter a location');
        }
    }

    function fetchWeatherData(location) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${config.apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => displayWeatherData(data))
            .catch(error => console.error('Error fetching weather data:', error));
    }

    function displayWeatherData(data) {
        const weatherInfoDiv = document.getElementById('weatherInfo');
        if (data.cod === 200) {
            weatherInfoDiv.innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
        } else {
            alert('Location not found');
        }
    }

    window.getWeatherByLocation = getWeatherByLocation; // Expose the function to the global scope
};
