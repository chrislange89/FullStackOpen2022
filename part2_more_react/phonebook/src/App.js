import { useState, useEffect } from 'react';
import { v4 } from 'uuid';
import axios from 'axios';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(res => {
      let loadedPersons = res.data;
      setPersons(loadedPersons);
    })
  }, [])

  function handleNameChange(event) {
    setNewName(event.target.value);
  }

  function handleNumberChange(event) {
    setNewNumber(event.target.value);
  }

  function handleSearchChange(event) {
    setSearchValue(event.target.value);
  }

  function handleAddNewName(event) {
    event.preventDefault();
    const nameExists = persons.find((person) => person.name === newName);

    if (nameExists) {
      alert(`Cannot add ${newName}, this person already exists!`);
      return;
    };

    if (newName === '') {
      alert('You must enter a name!');
      return;
    };

    if (newNumber === '') {
      alert('You must enter a number!');
      return;
    };

    let newPerson = {
        name: newName,
        number: newNumber,
        id: v4(),
    };

    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
  }

  const peopleToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchValue={searchValue}
        handleSearchChange={handleSearchChange}
      />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleAddNewName={handleAddNewName}
      />
      <h2>Contacts</h2>
      <Persons peopleToShow={peopleToShow} />
    </div>
  )
}

export default App;
