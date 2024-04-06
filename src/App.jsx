import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header/Header'
import CheckStatusScreen from './components/CheckStatusScreen/CheckStatusScreen'

function App() {

  return (
    <div className='app'>
      <Header />
      <CheckStatusScreen />
    </div>
  )
}

export default App
