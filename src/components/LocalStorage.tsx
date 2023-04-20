import * as React from 'react';
import { useCoordsContext } from "../context/coordsContext";
import { CityContextType, CoordsType, LSCityType, UpdateSaved } from "../@types/city";

const LocalStorage = () => {
    const { coords, updateCoords, city, onCityChange } = useCoordsContext();
    const [saved, setSaved] = React.useState({});

    const update = () => {
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
    }

    React.useEffect(() => {
        update();
    }, [city, coords]);

    React.useEffect(() => {
        update();
    }, []);

    const deleteCity = (event: React.MouseEvent) => {
        event.preventDefault();
        const { target } = event;
        let deleted: UpdateSaved = { ...saved };
        delete deleted[(target as HTMLButtonElement).value];
        setSaved({ ...deleted });
        localStorage.removeItem((target as HTMLButtonElement).value);
    }

    return (
        <div className="w-full flex flex-col items-center">
            <div className='w-full flex flex-row flex-wrap'>
                { Object.entries(saved).map(([key, value]) => { return (
                    <div className='flex mx-[0.5rem] justify-between bg-ctp-mantle border-ctp-sky border-2 rounded-md'>
                        <button className="mr-1 ml-2"><span className='' key={key}>{key}</span></button>
                        <button className="ml-1 mr-2 text-ctp-red" value={key} onClick={deleteCity}>
                            {`X`}
                        </button>
                    </div>
                )})}
            </div>
        </div>
    );
};


export default LocalStorage;
