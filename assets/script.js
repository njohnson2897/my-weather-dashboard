const citySearchBtn = $('#citySearchBtn')
const mainCard = $('#current-forecast')
const dayOne = $('#forecast-day-one')
const dayTwo = $('#forecast-day-two')
const dayThree = $('#forecast-day-three')
const dayFour = $('#forecast-day-four')
const dayFive = $('#forecast-day-five')

function handleSearchSubmit(event) {
    event.preventDefault();

    const cityInputVal = document.querySelector('#cityInput').value;

    if (!cityInputVal) {
        alert("Please enter a city name into the search form.")
        return;
    } else {
        console.log(`User searched for ${cityInputVal}`)
        apiRequest();
    };

    const cities = readLocalStorage();
    cities.push(cityInputVal);
    saveToLocalStorage(cities);
};

function apiRequest() {
    const cityInputVal = document.querySelector('#cityInput').value;
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
    const cityNameDate = $('<h2>').text(data.city.name);
    const cityTemp = $('<p>').text(data.list[0].main.temp);
    const cityWind = $('<p>').text(data.list[0].wind.speed);
    const cityHumid = $('<p>').text(data.list[0].main.humidity);
    mainCard.append(cityNameDate, cityTemp, cityWind, cityHumid);
}






citySearchBtn.on('click', handleSearchSubmit);
