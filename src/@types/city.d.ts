// @types.city.ts
export type CoordsType = {
    lat: number;
    lon: number;
}

export type WeatherDataType = {
    date: string;
    hour: string;
    full: string;
    temp: string;
    wind: string;
    humidity: string;
    emoji: string;
}

export type CityContextType = {
    coords: CoordsType;
    updateCoords: ({ lat, lon }: { lat:number, lon:number }) => void;
    city: string;
    onCityChange: (newCity: string) => void;
    weatherData: WeatherDataType[];
    onWeatherDataChange: (newWeatherData: WeatherDataType[]) => void;
};

export type LSCityType = {
    fetchCity: string;
    coords: CoordsType;
};

export type UpdateSaved = { [key: string]: CoordsType };
