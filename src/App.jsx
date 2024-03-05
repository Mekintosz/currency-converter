import { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./CurrencyRow.jsx";
import logo from "./currency_exchange.png"

function App() {
  const URL = "https://open.er-api.com/v6/latest/";
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(URL + 'EUR');
        const data = await response.json();
        const firstCurrency = Object.keys(data.rates)[1];
        setCurrencyOptions([...Object.keys(data.rates)]);
        setFromCurrency(data.base_code);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      } catch {
        console.log("Error occurred when fetching data");
      }
    })();
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      (async () => {
        try {
          const response = await fetch(URL + fromCurrency);
          const data = await response.json();
          setExchangeRate(data.rates[toCurrency]);
        } catch {
          console.log("Error occurred when fetching data");
        }
      })();
    }
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <>
     <header>
      <img
        className="logo"
        src={logo}
        alt="Currency Exchange Logo"
      />
      <p className="welcome">
        Welcome to currency exchange rates calculator. Choose currencies you
        want to exchange between and input amount for either. The conversion
        amount will be calculated for you.{" "}
        <a
          className="wiki-link"
          target="_blank"
          href="https://en.wikipedia.org/wiki/ISO_4217#Active_codes_(list_one)"
        >
          For a list of all currencies and country codes eg. EUR, USD, CZK
          click this sentence.
        </a>
      </p>
    </header>
      <div className="converter">
        <h1>Convert</h1>
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrency={(e) => setFromCurrency(e.target.value)}
          onChangeAmount={handleFromAmountChange}
          amount={fromAmount}
        />
        <div className="equals">=</div>
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onChangeCurrency={(e) => setToCurrency(e.target.value)}
          onChangeAmount={handleToAmountChange}
          amount={toAmount}
        />
      </div>
      <footer>
        <a
          className="link"
          target="_blank"
          href="https://www.exchangerate-api.com"
        >
          Powered By Exchange Rate API
        </a>
      </footer>
    </>
  );
}

export default App;
