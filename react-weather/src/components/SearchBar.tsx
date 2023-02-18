import React, { useState } from 'react';

const SearchBar = () => {
    const [geoData, setGeoData] = useState({});
    const [city, setCity] = useState("");
    let apiKeyOne = "2768f4e462cf5ac";
    let apiKeyTwo = "7fe624327115c943a";
    let geocodingAPI = "https://api.openweathermap.org/geo/1.0/direct";
    let currentWeatherAPI = "https://api.openweathermap.org/data/2.5/weather";
    let fiveDayAPI = "https://api.openweathermap.org/data/2.5/forecast";
    let rootEndpoint = "https://api.openweathermap.org/geo/1.0/direct";
    let apiCall = rootEndpoint + "?q=" + city + "&appid=" + apiKeyOne + apiKeyTwo;


    // FUNCTIONS

    async function fetchCoordinates() {
      console.log("hi");
      await fetch(apiCall)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not OK");
          }
          return response.json();
        })
        .then((data) => {
          setGeoData(data);
          localStorage.setItem(city, city);
          console.log(geoData);
        })
        .catch(function (error) {
          console.error("There has been a problem with your fetch operation: ", error);
        });

      // fetchWeather(geoData[0].lat, geoData[0].lon, city);
      // fetchFiveDay(geoData[0].lat, geoData[0].lon);
    }



    return (
        <div className="">
            <input 
                className="text-black"
                type="text" 
                value={city} 
                onChange={(e) => setCity(e.target.value)}
            />
            <button type="button" onClick={fetchCoordinates}>
                Search
            </button>
        </div>
    );
};


export default SearchBar;
