import axios from 'axios';
import React, { useState, useEffect } from 'react';

// instead of process.env.*, use import.meta.env.*
const api_key = import.meta.env.VITE_REACT_APP_API_KEY;

function Country({ country }) {
  const [visible, setVisible] = useState(false);
  const [weather, setWeather] = useState(null);

  function getWeatherDetails() {
    const API_STRING = `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&units=metric&appid=${api_key}`;
    // console.log(API_STRING);
    const weather_details = axios.get(API_STRING).then((res) => {
      // console.log(res.data);
      setWeather(res.data);
    });
  }

  function handleSetVisible() {
    setVisible(!visible);
  }

  const visiblePortion = (
    <div>
      <h2 style={{ display: 'inline' }}>{country.name.common} </h2>
      <button onClick={handleSetVisible}>{visible ? 'hide' : 'show'}</button>
    </div>
  );

  const hiddenPortion = (
    <div>
      <p>
        Capital <strong>{country.capital}</strong>
      </p>
      <p>
        Area <strong>{country.area}</strong>
      </p>
      <div>
        <h3>Languages</h3>
        <ul>
          {Object.keys(country.languages).map((element, i) => {
            return (
              <li>
                {Object.values(country.languages)[i]} <em>{element}</em>
              </li>
            );
          })}
        </ul>
        <img
          style={{ border: '1px solid gray' }}
          height='100px'
          src={country.flags.png}
        />
        <h3>Weather</h3>
        <div>
          {
          weather === null ? 
          '...loading weather' :
          <div>
            <p>Tempature {weather.main.temp}º Celcius</p>
            <p>Wind {JSON.stringify(weather.wind.speed)} m/s</p>
          </div>
          }
        </div>
      </div>
    </div>
  );

  useEffect(getWeatherDetails, [])

  return (
    <div>
      {visiblePortion}
      {visible ? hiddenPortion : ''}
    </div>
  );
}

export default Country;
