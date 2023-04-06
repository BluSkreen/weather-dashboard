import * as React from 'react';
import CityProvider from "./context/coordsContext";
import { Header, SearchBar, LocalStorage, OneDay, FiveDay } from './components';
import './App.css';

function App() {
  return (
    <CityProvider>
        <div className="App flex flex-col justify-center h-screen w-screen text-gray-300 bg-gradient-to-b from-ctp-base to-ctp-crust">
            <Header/>
            <div className="h-full w-full flex flex-col justify-center items-center">
                <section className='flex flex-row justify-center items-center'>
                    <section className="h-full min-w-[15rem] flex ">
                        <SearchBar/>
                        <LocalStorage/>
                    </section>
                    <OneDay/>
                </section>
                <section className='flex flex-col justify-center'>
                    <FiveDay/>
                </section>
            </div>
        </div>
    </CityProvider>
  )
}

export default App;
