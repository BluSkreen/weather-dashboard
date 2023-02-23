import * as React from 'react';
import { useCoordsContext } from "../context/coordsContext";
import { CityContextType, CoordsType, LSCityType } from "../@types/city";

const apiKeyOne = "2768f4e462cf5ac";
const apiKeyTwo = "7fe624327115c943a";
const geocodingAPI = "https://api.openweathermap.org/geo/1.0/direct";
const currentWeatherAPI = "https://api.openweathermap.org/data/2.5/weather";
const fiveDayAPI = "https://api.openweathermap.org/data/2.5/forecast";

const OneDay = () => {
    const { coords, updateCoords, city, onCityChange } = useCoordsContext();
    const [temp, setTemp] = React.useState("");
    const [wind, setWind] = React.useState("");
    const [humidity, setHumidity] = React.useState("");
    const [emoji, setEmoji] = React.useState("");
    const [display, setDisplay] = React.useState("");

    // This function will get the current weather for given coords and display them
    async function fetchWeather() {
      let apiCall: string = `${currentWeatherAPI}?lat=${coords["lat"]}&lon=${coords["lon"]}&units=imperial&appid=${apiKeyOne}${apiKeyTwo}`;
      let emojiURL = "https://openweathermap.org/img/wn/{id}@2x.png";
      let d = new Date();
      let today = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();

      await fetch(apiCall)
        .then(function (response) {
          return response.json();
        })
        .then(function (currentDayData) {
          // console.log(currentDayData);
          // display city and date
          setDisplay(city.charAt(0).toUpperCase() + city.slice(1) + " " + today);
          setEmoji(emoji.replace("{id}", currentDayData.weather[0].icon));
          setTemp(currentDayData.main.temp);
          setWind(currentDayData.wind.speed);
          setHumidity(currentDayData.main.humidity);
        });
    }

    React.useEffect(() => {
        fetchWeather();
    }, [coords])

    return (
        <div>
            <p>{city == "" ? "OneDay" : city}</p>
        </div>
    );
};


export default OneDay;
