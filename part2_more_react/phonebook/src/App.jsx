import React, { useState, useEffect } from 'react';
import { v4 } from 'uuid';
import axios from 'axios';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleAddNewName = (event) => {
    event.preventDefault();
    const nameExists = persons.find((person) => person.name === newName);

    if (nameExists) {
      alert(`Cannot add ${newName}, this person already exists!`);
      return;
    }

    if (newName === '') {
      alert('You must enter a name!');
      return;
    }

    if (newNumber === '') {
      alert('You must enter a number!');
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: v4(),
    };

    axios.post('http://localhost:3001/persons', newPerson)
      .then((res) => {
        // console.log(res);
        setPersons(persons.concat(res.data));
      });

    setNewName('');
    setNewNumber('');
  };

  const peopleToShow = persons.filter((person) => person.name.toLowerCase().includes(searchValue.toLowerCase()));

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((res) => {
      const loadedPersons = res.data;
      setPersons(loadedPersons);
    });
  }, []);

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
  );
}

export default App;
