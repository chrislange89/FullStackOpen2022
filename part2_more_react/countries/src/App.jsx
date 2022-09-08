import axios from 'axios';
import { nanoid }  from 'nanoid';
import React, { useState, useEffect } from 'react';
import Country from './components/Country';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [foundCountries, setFoundCountries] = useState([]);
  const [displayCountries, setDisplayCountries] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('Enter a search term');

  function handleSearchChange(event) {
    setSearchValue(event.target.value);

    if (searchValue !== '') {
      setErrorMessage('')
    } else {
      setErrorMessage('Enter a search term');
    }
  }

  function filterCountryHook() {
    let countriesToDisplay = foundCountries.filter((country) => country.name.common.toLowerCase().includes(searchValue.toLowerCase()));
    if (countriesToDisplay.length > 10) {
      setErrorMessage('Too many results! Try refining your search terms');
      setDisplayCountries([]);
      return;
    }
    setDisplayCountries(countriesToDisplay);
  }

  useEffect(filterCountryHook, [searchValue]);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((res) => {
      const foundData = res.data;
      setFoundCountries(foundData);
    });
  }, []);

  return (
    <div>
      find countries
      <input onChange={handleSearchChange} value={searchValue} />
      <ErrorMessage message={errorMessage} />
      {displayCountries.map((country) => (
        <Country key={nanoid()} country={country} />
      ))}
    </div>
  );
}

export default App;
