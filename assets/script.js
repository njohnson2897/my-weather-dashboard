const citySearchBtn = document.querySelector('#citySearchBtn')
const mainCard = document.querySelector('#current-forecast')
const dayOne = document.querySelector('#forecast-day-one')
const dayTwo = document.querySelector('#forecast-day-two')
const dayThree = document.querySelector('#forecast-day-three')
const dayFour = document.querySelector('#forecast-day-four')
const dayFive = document.querySelector('#forecast-day-five')

function handleSearchSubmit(event) {
    event.preventDefault();

    const cityInputVal = document.querySelector('#cityInput').value;

    if (!cityInputVal) {
        alert("Please enter a city name into the search form.")
        return;
    } else {
        console.log(`User searched for ${cityInputVal}`)
        apiRequestCurrent();
        // apiRequestFiveDay();
        printForecast();
    };

    // const cities = readLocalStorage();
    // cities.push(cityInputVal);
    // saveToLocalStorage(cities);
};

function apiRequestCurrent() {
    const cityInputVal = document.querySelector('#cityInput').value;
    let requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputVal}&appid=8c387a43d44b729cc8e9f5084ed67cad`
    fetch(requestUrl)
        .then(function (response) {
            return response.json()
        .then(function (data) {
            console.log(data)
            const cities = readLocalStorage();
            cities.push(data);
            saveToLocalStorage(cities);
        });
    });
};

// function apiRequestFiveDay() {
//     const cityInputVal = document.querySelector('#cityInput').value;
//     let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInputVal}&appid=8c387a43d44b729cc8e9f5084ed67cad`
//     fetch(requestUrl)
//         .then(function (response) {
//             return response.json()
//         .then(function (fiveDayData) {
//             console.log(fiveDayData)
//             return fiveDayData;
//         });
//     });
// };

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

// function printForecast() {
//     const cities = readLocalStorage();
//     const cityNameDate = $('<h2>').text(cities[0].name.value);
//     const cityTemp = $('<p>').text(cities[0].main.temp.value);
//     const cityWind = $('<p>').text(cities[0].wind.speed.value);
//     const cityHumid = $('<p>').text(cities[0].main.humidity.value);
//     mainCard.append(cityNameDate, cityTemp, cityWind, cityHumid);
// }






citySearchBtn.addEventListener('click', handleSearchSubmit);
