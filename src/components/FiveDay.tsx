import * as React from 'react';
import { useCoordsContext } from "../context/coordsContext";
import { CityContextType, CoordsType, LSCityType } from "../@types/city";

const apiKeyOne = "2768f4e462cf5ac";
const apiKeyTwo = "7fe624327115c943a";
const fiveDayAPI = new URL("https://api.openweathermap.org/data/2.5/forecast");

const FiveDay = () => {
    const { coords, updateCoords, city, onCityChange } = useCoordsContext();
    const [temp, setTemp] = React.useState("");
    const [wind, setWind] = React.useState("");
    const [humidity, setHumidity] = React.useState("");
    const [emoji, setEmoji] = React.useState("");

    const [forecast, setForecast] = React.useState([{
        date: "",
        temp: "",
        wind: "",
        humidity: "",
        emoji: "",
    }]);

    // This function will get the five day weather for given coords and display them
    async function fetchFiveDay() {
      fiveDayAPI.searchParams.set("lat", `${coords["lat"]}`);
      fiveDayAPI.searchParams.set("lon", `${coords["lon"]}`);
      fiveDayAPI.searchParams.set("units", "imperial");
      fiveDayAPI.searchParams.set("appid", apiKeyOne+apiKeyTwo);

      await fetch(fiveDayAPI)
        .then(function (response) {
          return response.json();
        })
        .then(function (fiveDayData) {
            //TODO change: this currently gets the first hour of each dayObjectIndex
          let list = fiveDayData.list;
          let dayObjectIndex = 0;
          let usedDays: string[] = []; // Keeps track of days seen
          // go through every item in list (i < 40)
          // use first hour of each day
          for (let i = 0; i < list.length; i++) {
            let dayOfListItem = list[i].dt_txt.split("-")[2].split(" ")[0];
            const d = new Date();
            let today = d.getDate();
            // compare current day to day of list[i]
            // AND compare current day + 6 to the day of list[i]
            if (today != dayOfListItem 
                && today + 6 != dayOfListItem 
                && !usedDays.includes(dayOfListItem)) {

                let emojiURL = "https://openweathermap.org/img/wn/{id}@2x.png";
                let newForecast = forecast;
                newForecast[dayObjectIndex] = {
                    date: `${list[i].dt_txt.split(" ")[0]}`,
                    temp: `${list[i].main.temp}`,
                    wind: `${list[i].wind.speed}`,
                    humidity: `${list[i].main.humidity}`,
                    emoji: emojiURL.replace("{id}", list[i].weather[0].icon),
                }
                dayObjectIndex++;

                setForecast(newForecast);
                usedDays.push(dayOfListItem);
            }
          }
          console.log(forecast);
        });
    }

    React.useEffect(() => {
        if(city !== "" && (coords["lat"] != 0 || coords["lon"] != 0)) {
            // console.log(coords);
            fetchFiveDay();
        }
    }, [coords, city])

    return (
        <div className='h-[10rem] w-full flex flex-col justify-center'>
            <div className='text-3xl'>FiveDay</div>
            <div className='flex p-2'>
                {forecast.map((day) => {
                    return (<div className='flex flex-col p-2'>
                        <span>{`Date: ${day.date}`}</span>
                        <span>{`Temp: ${day.temp}`}</span>
                        <span>{`Wind: ${day.wind}`}</span>
                        <span>{`humidity: ${day.humidity}`}</span>
                    </div>)
                })}
            </div>
        </div>
    );
};


export default FiveDay;
