


const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");


const weather = {};

weather.temperature = {
    unit : "celsius"
}


const KELVIN = 273;

const key = "82005d27a116c2880c8f0fcb866998a0";

// verifica se il browser supporta la geolocalizzazione
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Il tuo browser non supporta la geolocalizzazione!</p>";
}

// posizione utente
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

// mostra errore quano la geolocalizzazionenon non è disponibile
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> Posizione attuale N.D </p>`;
}

// chiamata del meteo tramite geolocalizzazione dall'api
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

// funzione di visualizzazione dati meteo
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// conversione da °C a F
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

// quando l'utente clicca sulla temp cambia in °C o F
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;

    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});
// chiamata del meteo tramite input città dall'api
prova.onclick = function() {

  let city = document.getElementById('weath').value;
  let api = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+key;

  fetch(api)
      .then(function(response){
          let data = response.json();
          return data;
      })
      .then(function(data){
          weather.temperature.value = Math.floor(data.main.temp - KELVIN);
          weather.description = data.weather[0].description;
          weather.iconId = data.weather[0].icon;
          weather.city = data.name;
          weather.country = data.sys.country;
      })
      .then(function(){
          displayWeather();
      });
}
