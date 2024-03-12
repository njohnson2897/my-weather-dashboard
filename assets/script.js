const citySearchBtn = document.querySelector('#citySearchBtn')

function handleSearchSubmit(event) {
    event.preventDefault();

    const cityInputVal = document.querySelector('#cityInput').value;

    if (!cityInputVal) {
        alert("Please enter a city name into the search form.")
        return;
    } else {
        console.log(`User searched for ${cityInputVal}`)
        apiRequestCurrent();
        apiRequestFiveDay();
    };

    const cities = readLocalStorage();
    cities.push(cityInputVal);
    saveToLocalStorage(cities);
};

function apiRequestCurrent() {
    const cityInputVal = document.querySelector('#cityInput').value;
    let requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputVal}&appid=8c387a43d44b729cc8e9f5084ed67cad`
    fetch(requestUrl)
        .then(function (response) {
            return response.json()
        .then(function (data) {
            console.log(data)
        });
    });
};

function apiRequestFiveDay() {
    const cityInputVal = document.querySelector('#cityInput').value;
    let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInputVal}&appid=8c387a43d44b729cc8e9f5084ed67cad`
    fetch(requestUrl)
        .then(function (response) {
            return response.json()
        .then(function (data) {
            console.log(data)
        });
    });
};

function  readLocalStorage() {
    let  cities = JSON.parse(localStorage.getItem('cities'))

    if(!cities){
        cities = [];
    }
    return cities;
}

function saveToLocalStorage(cities) {
    localStorage.setItem('cities', JSON.stringify(cities));
}






citySearchBtn.addEventListener('click', handleSearchSubmit);
