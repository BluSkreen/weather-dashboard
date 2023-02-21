import * as React from "react";
import { CityContextType, CoordsType } from "../@types/city";

interface Props {
    children: React.ReactNode;
};

const CityContext = React.createContext<CityContextType | null>(null);

export const useCoordsContext = () => React.useContext(CityContext) as CityContextType;

const CityProvider: React.FC<Props> = ({ children }) => {
  const [coords, setCoords] = React.useState<CoordsType>({ lat: 0, lon: 0});
  const [city, setCity] = React.useState<string>("");

  const updateCoords = (newCoords: CoordsType): void => {
    // console.log(emailInput);
    setCoords(newCoords);
  };

  const onCityChange = (newCity: string): void => {
    const cityInput = newCity;
    // console.log(emailInput);
    setCity(cityInput);
  };

  return (
    <CityContext.Provider
      value={{
        coords,
        updateCoords,
        city,
        onCityChange,
      }}
    >
      {children}
    </CityContext.Provider>
  );
};

export default CityProvider;
