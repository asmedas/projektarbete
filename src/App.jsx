import { useState } from 'react'
import Header from './components/header/Header'
import MainLayout from './components/mainlayout/MainLayout'
import './App.css'

function App() {

  return (
    <div className='glass-layout'>
      <Header/>
      <MainLayout />
    </div>

  )
}

export default App
