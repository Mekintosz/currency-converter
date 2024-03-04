import { useEffect, useState } from 'react'
import './App.css'
import CurrencyRow from './CurrencyRow.jsx'

const apiKey = import.meta.env.VITE_CURRENCY_CONVERTER_API_KEY


function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  console.log(currencyOptions)

  useEffect(() => {
    fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${apiKey}`, {mode: "cors"})
    .then(res => res.json())
    .then(data => {
      setCurrencyOptions([...Object.keys(data.rates)])
    })
  }, [])

  return (
    <>
     <h1>Convert</h1>
    <CurrencyRow
      currencyOptions={currencyOptions}
    >
    </CurrencyRow>
    <div className='equals'>=</div>
    <CurrencyRow
      currencyOptions={currencyOptions}
    >
    </CurrencyRow>
    </>
   
  )
}

export default App
