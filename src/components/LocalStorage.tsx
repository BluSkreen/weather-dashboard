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

    const deleteCity = (event: React.MouseEvent) => {
        event.preventDefault();
        const { target } = event;
        let deleted: UpdateSaved = { ...saved };
        delete deleted[(target as HTMLButtonElement).value];
        setSaved({ ...deleted });
        localStorage.removeItem((target as HTMLButtonElement).value);
    }

    return (
        <div>
            <h1>Saved</h1>
            <div className='flex flex-col'>
                { Object.entries(saved).map(([key, value]) => { return (
                    <div className='flex justify-between'>
                        <button><span className='' key={key}>{key}</span></button>
                        <button value={key} onClick={deleteCity}>
                            {`delete`}
                        </button>
                    </div>
                )})}
            </div>
        </div>
    );
};


export default LocalStorage;
