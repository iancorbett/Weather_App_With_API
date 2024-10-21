const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("city-input")

// const API_KEY = "46e3dd6dd81ee3002f80f5d2c219162a";
const API_KEY = "843fa40ad68a96668befb0da86d9b44b";

function getWeatherData () {
    const cityName = searchInput.value;


    // CURRENT WEATHER
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=imperial`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        const cityNameH3 = document.getElementById("city-name");
        cityNameH3.textContent = data.name

        const todayTempP = document.getElementById("today-temp");
        todayTempP.textContent = `Temp: ${data.main.temp} F`

        const todayWindP = document.getElementById("today-wind");
        todayWindP.textContent = `Wind: ${data.wind.speed} MPH`

        const todayHumidityP = document.getElementById("today-humidity");
        todayHumidityP.textContent = `Humidity: ${data.main.humidity}%`

    })




    // 5 DAY FORECAST
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=imperial`)
    .then(res => res.json())
    .then(data => {
        console.log(data.list)

        const filteredList = data.list.filter(item => {
            return item.dt_txt.includes("12:00:00")
        })

        console.log(filteredList);

        for (let i = 0; i < filteredList.length; i++) {
            const weatherData = filteredList[i];
            


            const targetTempP = document.getElementById(`day${i+1}-temp`);
            targetTempP.textContent = `Temp: ${weatherData.main.temp} F`

            const targetWindP = document.getElementById(`day${i+1}-wind`);
            targetWindP.textContent = `Wind: ${weatherData.wind.speed} MPH`

            const targetHumidityP = document.getElementById(`day${i+1}-humidity`);
            targetHumidityP.textContent = `Humidity: ${weatherData.main.humidity}%`

        }

    })
}

searchButton.addEventListener("click", getWeatherData)
