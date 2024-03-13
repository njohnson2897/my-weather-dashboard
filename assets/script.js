const citySearchBtn = $('#citySearchBtn')
const mainCard = $('#current-forecast')
const dayOne = $('#forecast-day-one')
const dayTwo = $('#forecast-day-two')
const dayThree = $('#forecast-day-three')
const dayFour = $('#forecast-day-four')
const dayFive = $('#forecast-day-five')
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

// how to use iteration to simplify this process
function printForecast(data) {
    const cityName = data.city.name
    const date = dayjs().format('MM/DD/YYYY');
    
    const forecast = [data.list[0], data.list[7], data.list[15], data.list[23], data.list[31], data.list[39]];
    
    mainCard.append(cityName, date, forecast[0].main.temp, forecast[0].wind.speed, forecast[0].main.humidity);
    dayOne.append(dayjs().add(1, 'day').format('MM/DD/YYYY'), forecast[1].main.temp,  forecast[1].wind.speed, forecast[1].main.humidity);
    dayTwo.append(dayjs().add(2, 'day').format('MM/DD/YYYY'), forecast[2].main.temp, forecast[2].wind.speed, forecast[2].main.humidity);
    dayThree.append(dayjs().add(3, 'day').format('MM/DD/YYYY'), forecast[3].main.temp, forecast[3].wind.speed, forecast[3].main.humidity);
    dayFour.append(dayjs().add(4, 'day').format('MM/DD/YYYY'), forecast[4].main.temp, forecast[4].wind.speed, forecast[4].main.humidity);
    dayFive.append(dayjs().add(5, 'day').format('MM/DD/YYYY'), forecast[5].main.temp, forecast[5].wind.speed, forecast[5].main.humidity);
};

searchHistory.on('click', 'button', handleSearchHistorySubmit)
citySearchBtn.on('click', handleSearchSubmit);

$(document).ready(function (){
    createSearchHistory();
});