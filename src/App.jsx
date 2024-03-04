import { useEffect } from 'react'
import './App.css'
import CurrencyRow from './CurrencyRow.jsx'

const BASE_URL = 'https://api.exchangeratesapi.io/v1/latest'

function App() {

  useEffect(() => {
    fetch(BASE_URL)
    .then(res => res.json())
    .then(data => console.log(data))
  }, [])

  return (
    <>
     <h1>Convert</h1>
    <CurrencyRow></CurrencyRow>
    <div className='equals'>=</div>
    <CurrencyRow></CurrencyRow>
    </>
   
  )
}

export default App
