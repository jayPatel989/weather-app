// Select elements
let cityInput = document.getElementById("cityInput");
let searchBtn = document.getElementById("searchBtn");

let cityName = document.getElementById("cityName");
let temperature = document.getElementById("temperature");
let description = document.getElementById("description");
let humidity = document.getElementById("humidity");
let errorMsg = document.getElementById("errorMsg");
let loading = document.getElementById("loading");

// Main function
function getWeather(city) {
    errorMsg.style.display = "none";
    loading.style.display = "block";

    let apiKey = "API_KEY"; // Replace here
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            loading.style.display = "none";
            updateUI(data);
        })
        .catch(error => {
            loading.style.display = "none";
            errorMsg.innerText = error.message;
            errorMsg.style.display = "block";
        });
}

// Update UI
function updateUI(data) {
    cityName.innerText = data.name;
    temperature.innerText = "Temperature: " + data.main.temp + "°C";
    description.innerText = "Weather: " + data.weather[0].description.toUpperCase();
    humidity.innerText = "Humidity: " + data.main.humidity + "%";

    // Icon
    let iconCode = data.weather[0].icon;
    let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.getElementById("weatherIcon").src = iconUrl;

    // Background
    let weatherMain = data.weather[0].main.toLowerCase();

    if (weatherMain.includes("cloud")){
        document.body.style.background = "linear-gradient(to right, #757f9a, #d7dde8)";
    }
    else if (weatherMain.includes("rain")){
        document.body.style.background = "linear-gradient(to right, #4b79a1, #283e51)";
    }
    else if (weatherMain.includes("clear")){
        document.body.style.background = "linear-gradient(to right, #fceabb, #f8b500)";
    }
    else if (weatherMain.includes("haze")){
        document.body.style.background = "linear-gradient(to right, #5a576e, #c7c0b7)";
    }
    else if (weatherMain.includes("smoke")){
        document.body.style.background = "linear-gradient(to right, #95a5a6, #d2a985)";
    }
    else {
        document.body.style.background = "linear-gradient(to right, #4facfe, #00f2fe)";
    }
}

// Event listeners
searchBtn.addEventListener("click", function() {
    let city = cityInput.value;
    getWeather(city);
});

cityInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        getWeather(cityInput.value);
    }
});

