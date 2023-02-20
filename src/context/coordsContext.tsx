import React, { createContext, useContext, useState } from "react";

const CoordsContext = createContext();

export const useCoordsContext = () => useContext(CoordsContext);

export const CoordsProvider = ({ children }) => {
  const [coords, setCoords] = useState("");
  const [city, setCity] = useState("");

  const onCityChange = (e) => {
    const cityInput = e.target.value;
    // console.log(emailInput);
    setCity(cityInput);
  };

  return (
    <CoordsContext.Provider
      value={{
        coords,
        setCoords,
        city,
        setCity,
      }}
    >
      {children}
    </CoordsContext.Provider>
  );
};

