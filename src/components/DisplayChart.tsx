 import * as React from 'react';
 import { AxisOptions, Chart } from 'react-charts'
 
 type MyDatum = { 
     date: Date, 
     type: string,
     value: number 
 }

   const startDate = new Date();
  // startDate.setFullYear(2020);
  startDate.setUTCHours(0);
  startDate.setUTCMinutes(0);
  startDate.setUTCSeconds(0);
  startDate.setUTCMilliseconds(0);
 
 const DisplayChart = () => {
   const data = [
     {
       label: 'React Charts',
       data: [
         {
           date: new Date(startDate.getTime() + 60 * 1000 * 60 * 24 * 1),
           type: "temp",
           value: 23467238,
         },
         {
           date: new Date(startDate.getTime() + 60 * 1000 * 60 * 24 * 3),
           type: "temp",
           value: 234339429,
         },
       ],
     }, 
   ]

   console.log(data);
 
   const primaryAxis = React.useMemo(
     (): AxisOptions<MyDatum> => ({
       getValue: datum => datum.date as Date,
     }),
     []
   )
 
   const secondaryAxes = React.useMemo(
     (): AxisOptions<MyDatum>[] => [
       {
         getValue: datum => datum.value,
         elementType: 'line',
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
