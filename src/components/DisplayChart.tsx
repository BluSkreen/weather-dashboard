 import * as React from 'react';
 import { AxisOptions, Chart } from 'react-charts'
 
 type MyDatum = { date: Date, stars: number }
 
 const DisplayChart = () => {
   const data = [
     {
       label: 'React Charts',
       data: [
         {
           date: new Date(),
           stars: 23467238,
         },
       ],
     },
   ]
 
   const primaryAxis = React.useMemo(
     (): AxisOptions<MyDatum> => ({
       getValue: (datum: MyDatum) => datum.date,
     }),
     []
   )
 
   const secondaryAxes = React.useMemo(
     (): AxisOptions<MyDatum>[] => [
       {
         getValue: (datum: MyDatum) => datum.stars,
       },
     ],
     []
   )
 
   return (
     <Chart
       options={{
         data,
         primaryAxis,
         secondaryAxes,
       }}
     />
   )
 }

 export default DisplayChart;
