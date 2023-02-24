import * as React from 'react';
import { useCoordsContext } from "../context/coordsContext";
import { CityContextType, CoordsType, LSCityType, UpdateSaved } from "../@types/city";


const LocalStorage = () => {
    const { coords, updateCoords, city, onCityChange } = useCoordsContext();
    const [saved, setSaved] = React.useState({});

    React.useEffect(() => {
        if (localStorage.length){
            let keys = Object.keys(localStorage);
            let update: UpdateSaved = {};
            for(let i = 0; i < keys.length; i++){
                let copy = { ...saved };
                let parse = JSON.parse(localStorage[keys[i]])
                //let update = { parse.fetchCity : parse};

                update[parse.fetchCity] = parse;
                //console.log(parse);
                // setSaved({...saved, parse.fetchCity : {...parse} });
                setSaved({...saved, ...update});
            }
            console.log("update");
            console.log(update);
        }
    }, [city, coords]);

    return (
        <div>
            <h1>Saved</h1>
            { Object.entries(saved).map(([key, value]) => {
                return (<span key={key}>{key}</span>)
            })}
        </div>
    );
};


export default LocalStorage;
