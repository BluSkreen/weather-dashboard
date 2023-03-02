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
    const [display, setDisplay] = React.useState("");

    const [forecast, setForecast] = React.useState([{
        temp: "",
        wind: "",
        humidity: "",
        emoji: "",
        display: ""
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
          // console.log(fiveDayData);
          let list = fiveDayData.list;
          let dayObjectIndex = 0;
          let fiveDaySorted = forecast;
          let usedDays; // Keeps track of days seen
          // go through every item in list (i < 40)
          for (let i = 0; i < list.length; i++) {
            // This gets the specific day of list[i]
            // console.log(list[i].dt_txt);
            let dayOfListItem = list[i].dt_txt.split("-")[2].split(" ")[0];
            const d = new Date();
            let today = d.getDate();
            // compare current day to day of list[i]
            // AND compare current day + 6 to the day of list[i]
            if (today != dayOfListItem && today + 6 != dayOfListItem) {
              // if usedDays does not include the day of list[i] then push and log
              if (!usedDays.includes(dayOfListItem)) {
                let dayObject = new Object();
                let emojiURL = "https://openweathermap.org/img/wn/{id}@2x.png";
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
        });
    }

    React.useEffect(() => {
        if(city !== "" && (coords["lat"] != 0 || coords["lon"] != 0)) {
            console.log(coords);
            fetchFiveDay();
        }
    }, [coords, city])

    return (
        <div>
            <p>FiveDay</p>
        </div>
    );
};


export default FiveDay;
