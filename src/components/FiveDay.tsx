import * as React from 'react';
import { useCoordsContext } from "../context/coordsContext";
import { CityContextType, CoordsType, LSCityType, WeatherDataType } from "../@types/city";

const apiKeyOne = "2768f4e462cf5ac";
const apiKeyTwo = "7fe624327115c943a";
const fiveDayAPI = new URL("https://api.openweathermap.org/data/2.5/forecast");

const FiveDay = () => {
    const { coords, city, weatherData, onWeatherDataChange } = useCoordsContext();

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
          let list = fiveDayData.list;
          let newWeatherData: WeatherDataType[] = [];

          for (let i = 0; i < list.length; i++) {
            const itemDate = new Date(list[i].dt_txt);
            const itemHour = itemDate.getHours();
            const today = new Date().getDate();

            if (today != itemDate.getDate() 
                && today + 6 != itemDate.getDate() 
                && (itemHour === 0 
                || itemHour === 6 
                || itemHour === 12 
                || itemHour === 18)
                ) {
                let emojiURL = "https://openweathermap.org/img/wn/{id}@2x.png";
                newWeatherData.push({
                    date: `${itemDate.toJSON().split('T')[0]}`,
                    hour: `${itemHour}`,
                    full: `${list[i].dt_txt}`,
                    temp: `${list[i].main.temp}`,
                    wind: `${list[i].wind.speed}`,
                    humidity: `${list[i].main.humidity}`,
                    emoji: emojiURL.replace("{id}", list[i].weather[0].icon),
                })
            }
          }
          onWeatherDataChange(newWeatherData);
        });
    }

    React.useEffect(() => {
        //fetchFiveDay();
    }, []);

    React.useEffect(() => {
        if(city !== "" && (coords["lat"] != 0 || coords["lon"] != 0)) {
            // console.log(coords);
            fetchFiveDay();
        }
    }, [coords, city]);

    return (
        <div className='h-[13rem] w-full flex flex-col items-center justify-center bg-gradient-to-b from-ctp-base to-ctp-crust border-ctp-sky border-2 rounded-md p-2'>
            <div className='text-3xl'>FiveDay</div>
            <div className='flex p-2'>
                {weatherData.map((day) => {
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
