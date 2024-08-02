document.getElementById('locationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const location = document.getElementById('locationInput').value;
    getWeather(location);
});

function getWeather(location) {
    const apiKey = '1cdd2b49f2f6b6d23c00f94d75ede8a8'; // Replace with your actual API key
    const [lat, lon] = location.split(',');

    let url = '';
    if (lat && lon) {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    } else {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const weatherDisplay = document.getElementById('weatherDisplay');
            const weather = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>${data.weather[0].description}</p>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
            weatherDisplay.innerHTML = weather;
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            const weatherDisplay = document.getElementById('weatherDisplay');
            weatherDisplay.innerHTML = `<p class="error">Could not fetch weather data. Please try again. ${error.message}</p>`;
        });
}
