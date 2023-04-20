import * as React from 'react';
import { useCoordsContext } from "../context/coordsContext";
import { CityContextType, CoordsType, LSCityType } from "../@types/city";

const SearchBar = () => {
    const { coords, updateCoords, city, onCityChange } = useCoordsContext();
    let [searchCity, setSearchCity] = React.useState<string>("");

    let apiKeyOne = "2768f4e462cf5ac";
    let apiKeyTwo = "7fe624327115c943a";
    let rootEndpoint = "https://api.openweathermap.org/geo/1.0/direct";

    // FUNCTIONS

    const fetchCoordinates = async () => {
        const fetchCity = (" " + searchCity).slice(1); // copy string because fetch is async
        let apiCall = rootEndpoint + "?q=" + fetchCity + "&appid=" + apiKeyOne + apiKeyTwo;
        try {
            const response = await fetch(apiCall)
            if (!response.ok) {
                throw new Error("Network response was not OK");
            }
            const geodata = await response.json();
            console.log(geodata);
            localStorage.setItem(fetchCity, JSON.stringify({ fetchCity, "coords": { "lat": geodata[0].lat, "lon": geodata[0].lon }} as LSCityType));
            updateCoords({ "lat": geodata[0].lat, "lon": geodata[0].lon } as CoordsType)
            onCityChange(fetchCity);
            console.log("search");
            //localStorage.setItem(fetchCity, fetchCity);
        }catch(err) {
            console.error("There has been a problem with your fetch operation: ", err);
        };

        setSearchCity("");
      // fetchWeather(geoData[0].lat, geoData[0].lon, city);
      // fetchFiveDay(geoData[0].lat, geoData[0].lon);
    }

    React.useEffect(() => {
        if (localStorage.length){
            let keys = Object.keys(localStorage);
            let data = JSON.parse(localStorage[keys[0]]);
            updateCoords(data.coords);
            onCityChange(data.fetchCity);
        } else {
            // default
            searchCity = "Denver";
            fetchCoordinates();
        }
    }, []);

    return (
        <div className="">
            <input 
                className="
                    bg-ctp-sky text-ctp-rosewater
                    focus:outline-none focus:ring-1 focus:ring-ctp-rosewater
                    rounded-md
                "
                type="text" 
                value={searchCity} 
                onChange={(e) => setSearchCity(e.target.value)}
            />
            <button 
                className="pl-[1rem]"
                type="button" onClick={fetchCoordinates}
            >
                Search
            </button>
        </div>
    );
};


export default SearchBar;
