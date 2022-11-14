// key
// 2768f4e462cf5ac7fe624327115c943a
// endpoint
// api.openweathermap.org
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// VARIABLE DECLARATIONS
var userInput = document.getElementById("user-input");
var inputButton = document.getElementById("input-button");
var userForm = document.getElementById("form-sbt");
var weatherDisplay = document.getElementById("weather-display");
var currentDayDisplay = document.getElementById("current-day");
var fiveDayDisplay = document.getElementById("five-day");
var apiKey = "2768f4e462cf5ac7fe624327115c943a";
var geocodingAPI = "http://api.openweathermap.org/geo/1.0/direct";
var currentWeatherAPI = "https://api.openweathermap.org/data/2.5/weather";
var fiveDayAPI = "http://api.openweathermap.org/data/2.5/forecast";

// FUNCTIONS

async function fetchCoordinates(city) {
  var rootEndpoint = "http://api.openweathermap.org/geo/1.0/direct";
  var apiCall = rootEndpoint + "?q=" + city + "&appid=" + apiKey;
  var geoData;
  await fetch(apiCall)
    .then(function (response) {
      // console.log(response);
      return response.json();
    })
    .then(function (data) {
      // console.log(fetchData);
      geoData = data;
    });
  console.log(geoData);
  fetchWeather(geoData[0].lat, geoData[0].lon, city);
  fetchFiveDay(geoData[0].lat, geoData[0].lon);
}

// This function will get the current weather for given coords and display them
async function fetchWeather(lat, lon, city) {
  var apiCall =
    currentWeatherAPI + "?lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=" + apiKey;
  var emojiURL = "http://openweathermap.org/img/wn/{id}@2x.png";
  const d = new Date();
  var today = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
  await fetch(apiCall)
    .then(function (response) {
      //
      return response.json();
    })
    .then(function (currentDayData) {
      console.log(currentDayData);
      // display city and date
      currentDayDisplay.children[0].children[0].children[0].textContent = city + " " + today;
      // use icon ID to make icon url, then, set img src to new url
      emojiURL = emojiURL.replace("{id}", currentDayData.weather[0].icon);
      currentDayDisplay.children[0].children[0].children[1].setAttribute("src", emojiURL);
      // change DOM to display temp, wind, and humidity
      currentDayDisplay.children[0].children[0].children[2].textContent =
        "Temp: " + currentDayData.main.temp;
      currentDayDisplay.children[0].children[0].children[3].textContent =
        "Wind: " + currentDayData.wind.speed;
      currentDayDisplay.children[0].children[0].children[4].textContent =
        "Humidity: " + currentDayData.main.humidity;
    });
}

// This function will get the five day weather for given coords and display them
async function fetchFiveDay(lat, lon) {
  var apiCall = fiveDayAPI + "?lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=" + apiKey;
  await fetch(apiCall)
    .then(function (response) {
      return response.json();
    })
    .then(function (fiveDayData) {
      console.log(fiveDayData);
      var list = fiveDayData.list;
      var dayObjectIndex = 0;
      var fiveDaySorted = [];
      var usedDays = []; // Keeps track of days seen
      // go through every item in list (i < 40)
      for (var i = 0; i < list.length; i++) {
        // This gets the specific day of list[i]
        var dayOfListItem = list[i].dt_txt.split("-")[2].split(" ")[0];
        const d = new Date();
        var today = d.getDate();
        // compare current day to day of list[i]
        // AND compare current day + 6 to the day of list[i]
        if (today != dayOfListItem && today + 6 != dayOfListItem) {
          // if usedDays does not include the day of list[i] then push and log
          if (!usedDays.includes(dayOfListItem)) {
            var dayObject = new Object();
            dayObjectIndex++;
            dayObject.date = list[i].dt_txt.split(" ")[0];
            dayObject.temp = list[i].main.temp;
            dayObject.wind = list[i].wind.speed;
            dayObject.humidity = list[i].main.humidity;
            // console.log(list[i]);
            // console.log(dayOfListItem);
            console.log(dayObject);
            fiveDaySorted.push(dayObject);
            usedDays.push(dayOfListItem);
          }
        }
      }
      console.log(fiveDaySorted);

      for (var i = 0; i < fiveDayDisplay.childElementCount; i++) {
        // console.log(fiveDayDisplay.children[i].children);
        fiveDayDisplay.children[i].children[0].children[0].textContent = fiveDaySorted[i].date;
        fiveDayDisplay.children[i].children[0].children[2].textContent =
          "Temp: " + fiveDaySorted[i].temp;
        fiveDayDisplay.children[i].children[0].children[3].textContent =
          "Wind: " + fiveDaySorted[i].wind;
        fiveDayDisplay.children[i].children[0].children[4].textContent =
          "Humidity: " + fiveDaySorted[i].humidity;
      }
    });
}

// function renderDayForcast(data) {

// }

// <button type="submit" class="btn btn-secondary" style="width: 100%" id="input-button">
//   Search
// </button>;
// function renderCards(data) {}

// this function is responsible for form submission bt capturing user input
function handleFormSubmit(e) {
  e.preventDefault();

  var input = userInput.value;
  fetchCoordinates(input);

  //make an api call with that search tearm adn congirtm data is sent back
}

// EVENT LISTENERS
inputButton.addEventListener("click", handleFormSubmit);

//Local Storage

//create an empty array

//push that value(name of the city) to that array

// localStorage.getItem("cities")

// localStorage.setItem("cities", )

//["austin", "denver", "seattle"]
