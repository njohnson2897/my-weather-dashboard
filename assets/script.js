const citySearchBtn = $('#citySearchBtn')
const searchHistory = $('#search-history')


function handleSearchSubmit(event) {
    event.preventDefault();

    let cityInputVal = document.querySelector('#cityInput').value;

    if (!cityInputVal) {
        alert("Please enter a city name into the search form.")
        return;
    } else {
        apiRequest(cityInputVal);
    };

    const cities = readLocalStorage();
        if (cities.length > 10) {
            cities.pop();
        }
    cities.push(cityInputVal);
    saveToLocalStorage(cities);
};


function handleSearchHistorySubmit(event) {
    event.preventDefault();
    let cityInputVal = $(event.target).text();
    apiRequest(cityInputVal)
}

function apiRequest(cityInputVal) {
    let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInputVal}&appid=8c387a43d44b729cc8e9f5084ed67cad`
    fetch(requestUrl)
        .then(function (response) {
            return response.json()
        .then(function (data) {
            console.log(data)
            printForecast(data);
        });
    });
};

function createSearchHistory() {
    const cities = readLocalStorage();
    for (city of cities) {
        const recentCity = $('<button>');
        recentCity.text(city).addClass('my-2 border border-black rounded bg-dark-subtle text-center w-100 searchHistoryBtn')
        searchHistory.append(recentCity)
    }
}


function  readLocalStorage() {
    let  cities = JSON.parse(localStorage.getItem('cities'));

    if(!cities){
        cities = [];
    }
    return cities;
}

function saveToLocalStorage(cities) {
    localStorage.setItem('cities', JSON.stringify(cities));
}

function printForecast(data) {
    const forecastCardSection = $('#five-day-forecast')
    const currentWeatherSection = $('#current-forecast')
    forecastCardSection.empty();
    currentWeatherSection.empty()
   
    const currentWeatherTitle = $('<h3>')
    const currentDate = dayjs().format('MM/DD/YYYY')
    currentWeatherTitle.text(`Weather in ${data.city.name} on ${currentDate}:`)
    currentWeatherSection.append(currentWeatherTitle, currentDate)
    const currentCard = $('<div>')
    currentCard.addClass('bg-dark-subtle mb-3 border border-white rounded text-center')
    const currentIcon =  $('<img>', {src: `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`})
    const currentWind = $('<p>')
    currentWind.text(`Wind: ${data.list[0].wind.speed}mph`)
    const currentTemp = $('<p>')
    // https://stackoverflow.com/questions/7342957/how-do-you-round-to-one-decimal-place-in-javascript found that using
    // .... Math.round like this is a way to keep it to 1 decimal
    const currentTempFahrenheit = Math.round((((data.list[0].main.temp - 273.15)) * 1.8 + 32) * 10) / 10
    currentTemp.text(`Temp: ${currentTempFahrenheit} degrees Fahrenheit`)
    const currentHumid = $('<p>')
    currentHumid.text(`Humidity: ${data.list[0].main.humidity}%`)
    currentCard.append(currentIcon, currentTemp, currentWind, currentHumid)
    currentWeatherSection.append(currentCard)


    const forecastTitle = $('<h3>')
    forecastTitle.text('Five Day Forecast:')
    forecastCardSection.append(forecastTitle)

    for (let i=7; i<data.list.length; i+=8) {
        const forecastCard = $('<div>')
        forecastCard.addClass('col-2 bg-dark-subtle mx-2 border border-white rounded')
        const cardDate = $('<p>').text((dayjs.unix(data.list[i].dt).format('MM/DD/YYYY')));
        const cardIcon = $('<img>', {src: `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`})
        const cardWind = $('<p>')
        cardWind.text(`Wind: ${data.list[i].wind.speed}mph`)
        const cardHumid = $('<p>')
        cardHumid.text(`Humidity: ${data.list[i].main.humidity}%`)
        const cardTemp = $('<p>')
        const cardTempFahrenheit = Math.round((((data.list[i].main.temp - 273.15)) * 1.8 + 32) * 10) / 10
        cardTemp.text(`Temp: ${cardTempFahrenheit} degrees Fahrenheit`)
        const forecastTitle = $('<h3>')
        forecastTitle.text('Five Day Forecast:')
        forecastCard.append(cardDate, cardIcon, cardTemp, cardWind, cardHumid)
        forecastCardSection.append(forecastCard);
    }
};

searchHistory.on('click', 'button', handleSearchHistorySubmit)
citySearchBtn.on('click', handleSearchSubmit);

$(document).ready(function (){
    createSearchHistory();
});