const citySearchBtn = document.querySelector('#citySearchBtn')

function handleSearchSubmit(event) {
    event.preventDefault()

    const cityInputVal = document.querySelector('#cityInput').value;

    if (!cityInputVal) {
        alert("Please enter a city name into the search form.")
        return;
    } else {
        console.log(`User searched for ${cityInputVal}`)
    }
}

citySearchBtn.addEventListener('click', handleSearchSubmit);