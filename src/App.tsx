import * as React from 'react';
import CityProvider from "./context/coordsContext";
import { Header, SearchBar, LocalStorage, OneDay, FiveDay, DisplayChart } from './components';
import './App.css';

function App() {
  return (
    <CityProvider>
        <div className="App 
            flex flex-col justify-center items-center h-screen w-screen 
            text-gray-300 bg-gradient-to-b from-ctp-base to-ctp-crust"
        >
            <Header/>
            <body className="flex flex-col items-center gap-y-5 h-full max-w-100">
                <section className='flex flex-row justify-center items-center gap-x-5 w-full'>
                    <section className="flex flex-col h-full min-w-[15rem]">
                        <SearchBar/>
                        <OneDay/>
                    </section>
                    <section className="h-full w-[30rem] bg-gradient-to-b from-ctp-base to-ctp-crust border-ctp-sky border-2 rounded-md">
                        <DisplayChart/>
                    </section>
                </section>

                <section className="min-w-[40rem]">
                    <LocalStorage/>
                </section>

                <section className='w-80p'>
                    <FiveDay/>
                </section>
            </body>
        </div>
    </CityProvider>
  )
}

export default App;
