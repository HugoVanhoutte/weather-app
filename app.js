let getCompassFromDeg = function(deg) {
    if(deg >= 337.5 || deg < 22.5){
        return "N";
    } else if(deg >= 22.5 && deg < 67.5){
        return "NE";
    } else if(deg >= 67.5 && deg < 112.5){
        return "E";
    } else if(deg >= 112.5 && deg < 157.5){
        return "SE";
    } else if(deg >= 157.5 && deg < 202.5){
        return "S";
    } else if(deg >= 202.5 && deg < 247.5){
        return "SW";
    } else if(deg >= 247.5 && deg < 292.5){
        return "W";
    } else if(deg >= 292.5 && deg < 337.5){
        return "NW";
    }
}

const userInput = $('#userCity');
const userButton = $('#userInput');
const tempsDiv = $('#temps');
const pressureDiv = $('#pressure');
const windDiv = $('#wind');
const humidityDiv = $('#humidity');
const cityDiv = $('#cityName');
const body = $('body');

let clear = () =>  {
    tempsDiv.text('');
    pressureDiv.text('');
    windDiv.text('');
    humidityDiv.text('');
    cityDiv.text('');
}

let getWeather = () => {

    let location = `q=${userInput.val()}`

    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?${location}&appid=bad7f45cd820c602ce5c227b81e28489&units=metric`,
        method: "GET",
        dataType: "json"
    })
        .done(function (response) {
            let main = response.weather[0].main.toLowerCase();
            body.css({'background-image': `url('images/${main}.jpg')`,'background-position': 'right', 'background-size': 'cover'})

            clear();

            cityDiv.append(`<h1>${response.name}</h1>`);
            pressureDiv.append(`<i class="fa-solid fa-gauge fa-5x"></i><p>${Math.round(response.main.pressure)} hPa</p>`);
            windDiv.prepend(`<i class="fa-solid fa-wind fa-5x"></i><p>${Math.round(response.wind.speed)} m/s</p><p>${response.wind.deg}°</p><p>${getCompassFromDeg(response.wind.deg)}</p>`);
            humidityDiv.append(`<i class="fa-solid fa-droplet fa-5x"></i><p>${Math.round(response.main.humidity)} %</p>`);
            tempsDiv.append(`<h2><i class="fa-solid fa-temperature-half"></i> ${Math.round(response.main.temp)} °C</h2><h3>Ressenti:<br>${Math.round(response.main.feels_like)} °C</h3>`);
        })

        .fail(function () {
            alert('Ville Introuvable');
            userInput.val();
        })
}

userButton.click(function () {
    getWeather();
})

body.keydown(function (event) {
    if (event.key === "Enter"){
        getWeather();
    }
})