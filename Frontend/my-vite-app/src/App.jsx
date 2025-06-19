// import { useState } from 'react'
import './App.css'
import HomePage from './Components/HomePage'
import BoardDisplayPage from './Components/BoardDisplayPage'
import {Routes, Route, Router} from 'react-router-dom'
import {useState} from 'react'

const App = () => {
  const [theme, setTheme] = useState('light')
  const toggleTheme = () => {
    setTheme(prevTheme=> (prevTheme === 'light' ? 'dark' : 'light'))
  };

  return (
    <div className={`app-container ${theme}-mode`}>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/:id" element={<BoardDisplayPage />}/>
        </Routes>
        <button onClick={toggleTheme}>
          Toggle to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
    </div>
  )
}

export default App
