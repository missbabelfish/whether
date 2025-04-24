// UI elements
const locInput = document.getElementById('loc-input')
const submitSearchBtn = document.getElementById('submit-search')
const currentTempDisplay = document.getElementById('current-temp')
const currentCondDisplay = document.getElementById('current-cond')
const highTemp = document.getElementById('high-temp')
const lowTemp = document.getElementById('low-temp')
const forecastCondDisplay = document.getElementById('forecast-cond')
const tmrwTempRange = document.getElementById('tmrw-temp-range')
const tmrwCondDisplay = document.getElementById('tmrw-cond')


function createQueryString(input) {
    return input.split(' ').filter((char) => char !== ',').join('%20')
}

async function getWeatherData(queryString) {
    const response = await fetch(
		`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${queryString}?unitGroup=us&key=ZZT6RZW4G8GVZHVCGQM9SX9PR&contentType=json`
	);
    const weatherData = await response.json()
    console.log(weatherData)
    displayWeatherData(weatherData)
}

function displayWeatherData(weatherData) {
    const {currentConditions, days, description} = weatherData
    const currentCond = currentConditions.conditions
    const currentTemp = Math.round(currentConditions.temp);
    const todayHigh = Math.round(days[0].tempmax);
    const todayLow = Math.round(days[0].tempmin);
    const tmrwHigh = Math.round(days[1].tempmax);
    const tmrwLow = Math.round(days[1].tempmin);

    currentTempDisplay.innerText = currentTemp
    currentCondDisplay.innerText = currentCond
    highTemp.innerText = todayHigh
    lowTemp.innerText = todayLow
    forecastCondDisplay.innerText = description
    tmrwTempRange.innerText = `${tmrwHigh}/${tmrwLow}`;
    tmrwCondDisplay.innerText = days[1].description;
}



submitSearchBtn.addEventListener('click', (e) => {
    e.preventDefault()
    let searchInput = locInput.value
    const queryString = createQueryString(searchInput)
    getWeatherData(queryString)
})