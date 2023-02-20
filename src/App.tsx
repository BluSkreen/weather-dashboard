import React, { useState } from 'react';
import { Header, SearchBar, LocalStorage, OneDay, FiveDay } from './components';
import './App.css';
import { CoordsProvider } from "./utils/CoordsContext";

function App() {

  return (
    <div className="App flex flex-col h-screen w-screen text-gray-300 bg-gray-900">
        <Header/>
        <CoordsProvider>
            <div className="h-full w-full flex">
                <aside className="h-full min-w-[15rem] flex flex-col">
                    <SearchBar/>
                    <LocalStorage/>
                </aside>
                <section>
                    <OneDay/>
                    <FiveDay/>
                </section>
            </div>
        </CoordsProvider>
    </div>
  )
}

export default App
