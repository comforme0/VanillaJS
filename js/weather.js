const weather = document.querySelector('.js-weather');

const API_KEY = "ee08c75345c6b38a324b4a5d392a3c45";
const COORDS = 'coords';


function getWeather(lat, lon) {
    fetch (
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    ).then(function(response) {
        return response.json()
    }).then(function(json) {
        const temperature = json.main.temp;
        const name = json.name;
        weather.innerText = `${temperature} @ ${name}`;
    })
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
}

function handleGeoError() {
    console.log("can not ")
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        const latitude = parsedCoords.latitude;
        const longitude = parsedCoords.longitude;
        getWeather(latitude, longitude);
    }
}

function init() {
    loadCoords();
}

init();