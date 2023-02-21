import * as React from 'react';
import { useCoordsContext } from "../context/coordsContext";
import { CityContextType, CoordsType, LSCityType } from "../@types/city";

const SearchBar = () => {
    const { coords, updateCoords, city, onCityChange } = useCoordsContext();
    const [searchCity, setSearchCity] = React.useState<string>("");

    let apiKeyOne = "2768f4e462cf5ac";
    let apiKeyTwo = "7fe624327115c943a";
    let rootEndpoint = "https://api.openweathermap.org/geo/1.0/direct";

    // FUNCTIONS

    async function fetchCoordinates() {
        const fetchCity = (" " + searchCity).slice(1); // copy string because fetch is async
        let apiCall = rootEndpoint + "?q=" + fetchCity + "&appid=" + apiKeyOne + apiKeyTwo;
        const response = await fetch(apiCall)
        try {
            if (!response.ok) {
                throw new Error("Network response was not OK");
            }
            const geodata = await response.json();
            updateCoords({ lat: geodata[0].lat, lon: geodata[0].lon } as CoordsType)
            onCityChange(fetchCity);
            localStorage.setItem(fetchCity, JSON.stringify({ fetchCity, coords } as LSCityType));
            console.log(geodata);
        }catch(err) {
            console.error("There has been a problem with your fetch operation: ", err);
        };

        setSearchCity("");
      // fetchWeather(geoData[0].lat, geoData[0].lon, city);
      // fetchFiveDay(geoData[0].lat, geoData[0].lon);
    }



    return (
        <div className="">
            <input 
                className="text-black"
                type="text" 
                value={searchCity} 
                onChange={(e) => setSearchCity(e.target.value)}
            />
            <button type="button" onClick={fetchCoordinates}>
                Search
            </button>
        </div>
    );
};


export default SearchBar;
