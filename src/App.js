import React, {useEffect, useState} from 'react';
import Selector from './Selector'
import './css/App.min.css';

function App() {
  const [fromCurrency, setFromCurrency] = useState('gbp');
  const [toCurrency, setToCurrency] = useState('pln');
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState(false)
  const [CurrencyFromError, setCurrencyFromError] = useState(true)
  const [CurrencyToError, setCurrencyToError] = useState(true)
  const [FirstExchangeRate, setFirstExchangeRate] = useState(0)
  const [SecondExchangeRate, setSecondExchangeRate] = useState(0)
  const [result, setResult] = useState('')

  const handleChangeInput = (e) => {
    e.target.value < 0 ? setInputError(true) && setInputValue('') : setInputError(false) || setInputValue(e.target.value);
    setResult('')
  }

  useEffect(()=>{
    if(fromCurrency !== 'pln'){
    fetch(`http://api.nbp.pl/api/exchangerates/rates/c/${fromCurrency}/?format=json`)
      .then(response => response.json())
      .then(response => {
        setCurrencyFromError(true)
        setFirstExchangeRate(response.rates[0].bid)
      })
    }else{
      setFirstExchangeRate(1)
    }
    if(toCurrency !== 'pln'){
    fetch(`http://api.nbp.pl/api/exchangerates/rates/c/${toCurrency}/?format=json`)
      .then(response => response.json())
      .then(response => {
        setCurrencyToError(true)
        setSecondExchangeRate(response.rates[0].bid)
      })
    }else{
      setSecondExchangeRate(1)
    }
  },[fromCurrency, toCurrency])

  const handleClick = () => {
    const toPln = inputValue * FirstExchangeRate;
    const result = (toPln / SecondExchangeRate).toFixed(2)
    setResult(result);
  }

  return (
    <>
      <h1>Choose currency</h1>
      <Selector exchange='from' currency={setFromCurrency} result={setResult}/>
      <Selector exchange='to' currency={setToCurrency} result={setResult}/>
      <input type="number" value={inputValue} onChange={handleChangeInput}/>
      {inputError ? <p className='error'>Value greater than 0</p> : null}
      <button onClick={handleClick}>Exchange</button>
      <h2>{result}</h2>
      {!CurrencyToError && !CurrencyFromError ? 'Something goes wrong' : null}
    </>
  );
}

export default App;
