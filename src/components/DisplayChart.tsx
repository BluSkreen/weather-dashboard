import * as React from 'react';
import { AxisOptions, Chart } from 'react-charts'
import { useCoordsContext } from "../context/coordsContext";
 
type MyDatum = { 
    date: Date, 
    type: string,
    value: number 
}

const DisplayChart = () => {
    const { weatherData } = useCoordsContext();
    const data = [{
        label: 'React Charts',
        data: weatherData.map((item) => {
            return {
                date: new Date(item.full),
                type: "temp",
                value: parseFloat(item.temp),
            }
        }),
     }]
    console.log(data);

    const primaryAxis = React.useMemo((): AxisOptions<MyDatum> => ({
       getValue: datum => datum.date as Date,
       scaleType: 'time',
    }), [])

    const secondaryAxes = React.useMemo((): AxisOptions<MyDatum>[] => [{
        getValue: datum => datum.value,
        elementType: 'line',
    }], [])

    return (
     <Chart
       options={{
         data,
         primaryAxis,
         secondaryAxes,
         dark: true, 
       }}
     />
    )
 }

 export default DisplayChart;
