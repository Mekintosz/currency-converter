import { useEffect, useState } from 'react'
import './App.css'
import CurrencyRow from './CurrencyRow.jsx'

const apiKey = import.meta.env.VITE_CURRENCY_CONVERTER_API_KEY
const baseApi = `http://api.exchangeratesapi.io/v1/latest?access_key=${apiKey}`


function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState(1)
  const [exchangeRate, setExchangeRate] = useState(1)
  const [amount, setAmount] = useState(1)
  const[amountInFromCurrency, setAmountInFromCurrency] = useState(true)

  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  useEffect(() => {
    fetch(`https://open.er-api.com/v6/latest/EUR`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      const firstCurrency = Object.keys(data.rates)[1]
      setCurrencyOptions([...Object.keys(data.rates)])
      setFromCurrency(data.base_code)
      setToCurrency(firstCurrency)
      setExchangeRate(data.rates[firstCurrency])
    })
  }, [])

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`)
      .then(res => res.json())
      .then(data => setExchangeRate(data.rates[toCurrency]))
     
    }
  }, [fromCurrency, toCurrency])
    
    

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (
    <>
     <h1>Convert</h1>
    <CurrencyRow
      currencyOptions={currencyOptions}
      selectedCurrency={fromCurrency}
      onChangeCurrency={e => setFromCurrency(e.target.value)}
      onChangeAmount={handleFromAmountChange}
      amount={fromAmount}
    >
    </CurrencyRow>
    <div className='equals'>=</div>
    <CurrencyRow
      currencyOptions={currencyOptions}
      selectedCurrency={toCurrency}
      onChangeCurrency={e => setToCurrency(e.target.value)}
      onChangeAmount={handleToAmountChange}
      amount={toAmount}
    >
    </CurrencyRow>
    </>
   
  )
}

export default App
