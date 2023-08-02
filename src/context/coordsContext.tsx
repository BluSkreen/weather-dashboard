import * as React from "react";
import { CityContextType, CoordsType, WeatherDataType } from "../@types/city";

interface Props {
    children: React.ReactNode;
};

const CityContext = React.createContext<CityContextType | null>(null);

export const useCoordsContext = () => React.useContext(CityContext) as CityContextType;

const CityProvider: React.FC<Props> = ({ children }) => {
    const [coords, setCoords] = React.useState<CoordsType>({ lat: 0, lon: 0});
    const [city, setCity] = React.useState<string>("");
    const [weatherData, setWeatherData] = React.useState<WeatherDataType[]>([{
        date: "",
        hour: "",
        full: "",
        temp: "",
        wind: "",
        humidity: "",
        emoji: "",
    }]);

  const updateCoords = (newCoords: CoordsType): void => {
    // console.log(emailInput);
    setCoords(newCoords);
  };

  const onCityChange = (newCity: string): void => {
    const cityInput = newCity;
    // console.log(emailInput);
    setCity(cityInput);
  };

  const onWeatherDataChange = (newWeatherData: WeatherDataType[]): void => {
      const weatherData = newWeatherData;
      setWeatherData(weatherData);
  }

  return (
    <CityContext.Provider
      value={{
        coords,
        updateCoords,
        city,
        onCityChange,
        weatherData,
        onWeatherDataChange
      }}
    >
      {children}
    </CityContext.Provider>
  );
};

export default CityProvider;
