import React, { useState } from 'react';

const SearchBar = () => {
    let apiKeyOne = "2768f4e462cf5ac";
    let apiKeyTwo = "7fe624327115c943a";
    let geocodingAPI = "https://api.openweathermap.org/geo/1.0/direct";
    let currentWeatherAPI = "https://api.openweathermap.org/data/2.5/weather";
    let fiveDayAPI = "https://api.openweathermap.org/data/2.5/forecast";

    const [geoData, setGeoData] =useState(0);

    // FUNCTIONS

    async function fetchCoordinates(city) {
      let rootEndpoint = "https://api.openweathermap.org/geo/1.0/direct";
      let apiCall = rootEndpoint + "?q=" + city + "&appid=" + apiKeyOne + apiKeyTwo;
      let geoData;
      await fetch(apiCall)
        .then(function (response) {
          // console.log(response);
          if (!response.ok) {
            throw new Error("Network response was not OK");
          }
          return response.json();
        })
        .then(function (data) {
          // console.log(fetchData);
          setGeoData(data);
          localStorage.setItem(city, city);
        })
        .catch(function (error) {
          console.error("There has been a problem with your fetch operation: ", error);
        });
      // console.log(geoData);

      // fetchWeather(geoData[0].lat, geoData[0].lon, city);
      // fetchFiveDay(geoData[0].lat, geoData[0].lon);
    }

    // This function will get the current weather for given coords and display them
    async function fetchWeather(lat, lon, city) {
      var apiCall =
        currentWeatherAPI +
        "?lat=" +
        lat +
        "&lon=" +
        lon +
        "&units=imperial" +
        "&appid=" +
        apiKeyOne +
        apiKeyTwo;
      var emojiURL = "https://openweathermap.org/img/wn/{id}@2x.png";
      const d = new Date();
      var today = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
      await fetch(apiCall)
        .then(function (response) {
          return response.json();
        })
        .then(function (currentDayData) {
          // console.log(currentDayData);
          // display city and date
          currentDayDisplay.children[0].children[0].children[0].textContent =
            city.charAt(0).toUpperCase() + city.slice(1) + " " + today;
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
      var apiCall =
        fiveDayAPI +
        "?lat=" +
        lat +
        "&lon=" +
        lon +
        "&units=imperial" +
        "&appid=" +
        apiKeyOne +
        apiKeyTwo;
      await fetch(apiCall)
        .then(function (response) {
          return response.json();
        })
        .then(function (fiveDayData) {
          // console.log(fiveDayData);
          var list = fiveDayData.list;
          var dayObjectIndex = 0;
          var fiveDaySorted = [];
          var usedDays = []; // Keeps track of days seen
          // go through every item in list (i < 40)
          for (var i = 0; i < list.length; i++) {
            // This gets the specific day of list[i]
            // console.log(list[i].dt_txt);
            var dayOfListItem = list[i].dt_txt.split("-")[2].split(" ")[0];
            const d = new Date();
            var today = d.getDate();
            // compare current day to day of list[i]
            // AND compare current day + 6 to the day of list[i]
            if (today != dayOfListItem && today + 6 != dayOfListItem) {
              // if usedDays does not include the day of list[i] then push and log
              if (!usedDays.includes(dayOfListItem)) {
                var dayObject = new Object();
                var emojiURL = "https://openweathermap.org/img/wn/{id}@2x.png";
                dayObjectIndex++;
                dayObject.date = list[i].dt_txt.split(" ")[0];
                dayObject.icon = emojiURL.replace("{id}", list[i].weather[0].icon);
                dayObject.temp = list[i].main.temp;
                dayObject.wind = list[i].wind.speed;
                dayObject.humidity = list[i].main.humidity;
                console.log(list[i]);
                // console.log(dayOfListItem);
                // console.log(dayObject);
                fiveDaySorted.push(dayObject);
                usedDays.push(dayOfListItem);
              }
            }
          }
          // console.log(fiveDaySorted);
          // DOM manipulations
          for (var i = 0; i < fiveDayDisplay.childElementCount; i++) {
            // console.log(fiveDayDisplay.children[i].children);
            fiveDayDisplay.children[i].children[0].children[0].textContent = fiveDaySorted[i].date;
            fiveDayDisplay.children[i].children[0].children[1].setAttribute(
              "src",
              fiveDaySorted[i].icon
            );
            fiveDayDisplay.children[i].children[0].children[2].textContent =
              "Temp: " + fiveDaySorted[i].temp;
            fiveDayDisplay.children[i].children[0].children[3].textContent =
              "Wind: " + fiveDaySorted[i].wind;
            fiveDayDisplay.children[i].children[0].children[4].textContent =
              "Humidity: " + fiveDaySorted[i].humidity;
          }
        });
    }


    return (
        <div className="">
            <input 
                type="text" 
                value={city} 
                onChange => {(e) => setCity(e.target.value)}
            />
            <button type="button">
                Search
            </button>
        </div>
    );
};


export default SearchBar;
