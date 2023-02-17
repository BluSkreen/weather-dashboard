import { useState } from 'react';

import { Header, SearchBar, LocalStorage, OneDay, FiveDay } from './components';

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App flex flex-col h-screen w-screen text-gray-300 bg-gray-900">
        <Header/>
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
    </div>
  )
}

export default App
