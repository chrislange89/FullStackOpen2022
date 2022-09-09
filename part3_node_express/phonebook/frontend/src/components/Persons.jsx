import React from 'react';
import Person from './Person';

function Persons({ peopleToShow, handleDelete }) {
  return (
    <div>
      <ul>
        {peopleToShow.map((who) => (
          <Person key={who.id} person={who} handleDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
}

export default Persons;
