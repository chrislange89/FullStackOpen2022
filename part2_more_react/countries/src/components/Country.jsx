import React, { useState } from 'react';

function Country({ country }) {
  const [visible, setVisible] = useState(false);

  console.log(country);

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
      </div>
    </div>
  );

  return (
    <div>
      {visiblePortion}
      {visible ? hiddenPortion : ''}
    </div>
  );
}

export default Country;
