let xhr = new XMLHttpRequest();
const userInput = document.getElementById("userCity");
const userButton = document.getElementById("userInput");

const tempsDiv = document.getElementById("temps");
const pressureDiv = document.getElementById("pressure");
const windDiv = document.getElementById("wind");
const humidityDiv = document.getElementById("humidity");
const cityDiv = document.getElementById("cityName");

let clear = () => {
    tempsDiv.innerText = "";
    pressureDiv.innerText = "";
    windDiv.innerText = "";
    humidityDiv.innerText = "";
    cityDiv.innerText = "";
}
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

let getWeather = () => {

    let location = `q=${userInput.value}`

    xhr.open("GET", `https://api.openweathermap.org/data/2.5/weather?${location}&appid=bad7f45cd820c602ce5c227b81e28489&units=metric`)
    xhr.responseType = "json";

    xhr.onload = function() {
        if(xhr.status !== 200) {
            alert("Ville Introuvable");
            userInput.value = "";
        }

        let main = xhr.response.weather[0].main.toLowerCase();
        document.body.style.backgroundImage = `url('images/${main}.jpg')`;
        document.body.style.backgroundPosition = "right";
        document.body.style.backgroundSize = "cover";

        clear();

        let cityNameDisplay = document.createElement("h1");

        let pressureIcon = document.createElement("i");
        let windIcon = document.createElement("i");
        let humidityIcon = document.createElement("i");

        let temp = document.createElement("h2");
        let feelsLike = document.createElement("h3");
        let pressure = document.createElement("p");
        let humidity = document.createElement("p");
        let windSpeed = document.createElement("p");
        let windDirection = document.createElement("p");
        let windDirectionCompass = document.createElement("p");


        cityNameDisplay.innerText = xhr.response.name;

        pressureIcon.className = "fa-solid fa-gauge fa-5x";
        windIcon.className = "fa-solid fa-wind fa-5x";
        humidityIcon.className = "fa-solid fa-droplet fa-5x"

        temp.innerHTML = `<i class="fa-solid fa-temperature-half"></i> ${Math.round(xhr.response.main.temp)} °C`;
        feelsLike.innerHTML = `Ressenti:<br>${Math.round(xhr.response.main.feels_like)} °C`;
        pressure.innerText = `${Math.round(xhr.response.main.pressure)} hPa`;
        windSpeed.innerText = `${Math.round(xhr.response.wind.speed)} m/s`;
        windDirection.innerText = `${xhr.response.wind.deg}°`;
        windDirectionCompass.innerText = getCompassFromDeg(xhr.response.wind.deg);
        humidity.innerText = `${Math.round(xhr.response.main.humidity)} %`;



        cityDiv.append(cityNameDisplay);

        pressureDiv.append(pressureIcon);
        windDiv.prepend(windIcon);
        humidityDiv.append(humidityIcon);

        tempsDiv.append(temp);
        tempsDiv.append(feelsLike);
        pressureDiv.append(pressure);
        humidityDiv.append(humidity);
        windDiv.append(windSpeed);
        windDiv.append(windDirection);
        windDiv.append(windDirectionCompass);
    }
    xhr.send();
}

userButton.addEventListener("click", getWeather)

document.body.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        getWeather();
    }
})
