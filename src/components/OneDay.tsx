import * as React from 'react';
import { useCoordsContext } from "../context/coordsContext";
import { CityContextType, CoordsType, LSCityType } from "../@types/city";

const apiKeyOne = "2768f4e462cf5ac";
const apiKeyTwo = "7fe624327115c943a";
const currentWeatherAPI = new URL("https://api.openweathermap.org/data/2.5/weather");

const OneDay = () => {
    const { coords, updateCoords, city, onCityChange } = useCoordsContext();
    const [temp, setTemp] = React.useState("");
    const [wind, setWind] = React.useState("");
    const [humidity, setHumidity] = React.useState("");
    const [emoji, setEmoji] = React.useState("");
    const [display, setDisplay] = React.useState("");

    // This function will get the current weather for given coords and display them
    async function fetchWeather() {
      currentWeatherAPI.searchParams.set("lat", `${coords["lat"]}`);
      currentWeatherAPI.searchParams.set("lon", `${coords["lon"]}`);
      currentWeatherAPI.searchParams.set("units", "imperial");
      currentWeatherAPI.searchParams.set("appid", apiKeyOne+apiKeyTwo);

      // let apiCall: string = `${currentWeatherAPI}?lat=${coords["lat"]}&lon=${coords["lon"]}&units=imperial&appid=${apiKeyOne}${apiKeyTwo}`;
      let emojiURL = "https://openweathermap.org/img/wn/{id}@2x.png";
      let d = new Date();
      let today = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();

      await fetch(currentWeatherAPI)
        .then(function (response) {
          return response.json();
        })
        .then(function (currentDayData) {
          // -- console.log("current day");
          // -- console.log(currentDayData);
          // display city and date
          setDisplay(city.charAt(0).toUpperCase() + city.slice(1) + " " + today);
          setEmoji(emoji.replace("{id}", currentDayData.weather[0].icon));
          setTemp(currentDayData.main.temp);
          setWind(currentDayData.wind.speed);
          setHumidity(currentDayData.main.humidity);
        });
    }

    React.useEffect(() => {
        if(city !== "" && (coords["lat"] != 0 || coords["lon"] != 0)) {
            // --- console.log(coords);
            fetchWeather();
        }
    }, [coords, city])

    return (
        <article className='h-[10rem] w-full my-3 flex flex-col items-center justify-center border-solid border-2 rounded-md'>
            <h2 className='text-xl'>Today's Weather</h2>
            <h1 className='text-3xl'>{city}</h1>
            <span>{`Temp: ${temp}`} </span>
            <span>{`Wind: ${wind}`}</span>
            <span>{`humidity: ${humidity}`}</span>
        </article>
    );
};


export default OneDay;
