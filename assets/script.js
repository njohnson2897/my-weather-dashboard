const citySearchBtn = document.querySelector('#citySearchBtn')

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
};

function apiRequest() {
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



citySearchBtn.addEventListener('click', handleSearchSubmit);
