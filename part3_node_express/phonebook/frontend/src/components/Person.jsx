import React from 'react';

function Person({ person, handleDelete }) {
  return (
    <li>
      {person.name}
      {' - '}
      {person.number}
      <button type="button" id={person.id} onClick={handleDelete}>delete</button>
    </li>
  );
}

export default Person;
