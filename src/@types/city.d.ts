// @types.city.ts
export type CoordsType = {
    lat: number;
    lon: number;
}

export type CityContextType = {
    coords: CoordsType;
    updateCoords: ({ lat, lon }: { lat:number, lon:number }) => void;
    city: string;
    onCityChange: (newCity: string) => void;
};

export type LSCityType = {
    fetchCity: string;
    coords: CoordsType;
};
