// import { useState } from 'react'
import './App.css'
import HomePage from './Components/HomePage'
import BoardDisplayPage from './Components/BoardDisplayPage'
import {Routes, Route, Router} from 'react-router-dom'

const App = () => {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/:id" element={<BoardDisplayPage />}/>
        </Routes>
    </div>
  )
}

export default App
