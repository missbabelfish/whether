import './styles.css';

// UI elements
const locInput = document.getElementById('loc-input');
const submitSearchBtn = document.getElementById('submit-search');
const currentTempDisplay = document.getElementById('current-temp');
const currentCondDisplay = document.getElementById('current-cond');
const highTemp = document.getElementById('high-temp');
const lowTemp = document.getElementById('low-temp');
const forecastCondDisplay = document.getElementById('forecast-cond');
const tmrwTempRange = document.getElementById('tmrw-temp-range');
const tmrwCondDisplay = document.getElementById('tmrw-cond');
const fahrenheit = document.getElementById('fahrenheit');
const unitSelect = document.getElementById('unit-select')

let currentWeatherData = null;
let currentUnits = 'f'
let currentQueryString = ''

function createQueryString(input) {
	const queryString = input.split(' ').filter(char => char !== ',').join('%20');
    currentQueryString = queryString
    return queryString
}

function toggleUnits() {
    currentUnits = currentUnits === 'f' ? 'c' : 'f'
    if (currentWeatherData) {
        updateWeatherData(currentQueryString)
    }
}

function loadWeatherData(input) {
    const queryString = createQueryString(input)
	updateWeatherData(queryString)
}

async function updateWeatherData(input) {
    const response = await fetch(
		`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input}?unitGroup=${
			currentUnits === 'f' ? 'us' : 'metric'
		}&key=ZZT6RZW4G8GVZHVCGQM9SX9PR&contentType=json`
	);
	const weatherData = await response.json();
	displayWeatherData(weatherData);
	currentWeatherData = weatherData;
}

function displayWeatherData(weatherData) {
	const { currentConditions, days, description } = weatherData;
	const currentCond = currentConditions.conditions;
	const currentTemp = Math.round(currentConditions.temp);
	const todayHigh = Math.round(days[0].tempmax);
	const todayLow = Math.round(days[0].tempmin);
	const tmrwHigh = Math.round(days[1].tempmax);
	const tmrwLow = Math.round(days[1].tempmin);

	currentTempDisplay.innerText = currentTemp;
	currentCondDisplay.innerText = currentCond;
	highTemp.innerText = todayHigh;
	lowTemp.innerText = todayLow;
	forecastCondDisplay.innerText = days[0].description;
	tmrwTempRange.innerText = `${tmrwHigh}/${tmrwLow}`;
	tmrwCondDisplay.innerText = days[1].description;
}

submitSearchBtn.addEventListener('click', e => {
	e.preventDefault();
	const searchInput = locInput.value;
	loadWeatherData(searchInput);
});

unitSelect.addEventListener('input', toggleUnits)
