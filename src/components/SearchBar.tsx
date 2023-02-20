import React, { useState } from 'react';
import { useCoordsContext } from "../utils/CoordsContext";

const SearchBar = () => {
    const [geoData, setGeoData] = useState({});
    const { coords, setCoords, city, setCity } = useCoordsContext();

    let apiKeyOne = "2768f4e462cf5ac";
    let apiKeyTwo = "7fe624327115c943a";
    let rootEndpoint = "https://api.openweathermap.org/geo/1.0/direct";


    // FUNCTIONS

    async function fetchCoordinates() {
        let apiCall = rootEndpoint + "?q=" + city + "&appid=" + apiKeyOne + apiKeyTwo;
      console.log("hi");
      await fetch(apiCall)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not OK");
          }
          return response.json();
        })
        .then((data) => {
          localStorage.setItem(city, city);
          console.log(data);
        })
        .catch(function (error) {
          console.error("There has been a problem with your fetch operation: ", error);
        });

        setCity("");
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
