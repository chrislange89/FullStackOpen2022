import React, { useState, useEffect } from 'react';
import { v4 } from 'uuid';

import personsService from './services/personsService';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const loadPeople = () => {
    personsService.getAll().then((res) => {
      const loadedPersons = res.data;
      setPersons(loadedPersons);
    });
  };

  const clearAddFields = () => {
    setNewName('');
    setNewNumber('');
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleDelete = (event) => {
    setPersons(persons.filter((person) => person.id !== event.target.id));
    personsService.deletePerson(event.target.id);
  };

  const handleAddNewName = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase());

    if (existingPerson) {
      const replaceNumber = window.confirm(`${newName} already exists, replace the old number with a new one?`);
      if (replaceNumber && newNumber !== '' && newNumber !== null) {
        const newPerson = { ...existingPerson, number: newNumber };
        personsService.update(existingPerson.id, newPerson);
        clearAddFields();
        loadPeople();
      }
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

    personsService.create(newPerson)
      .then((res) => {
        setPersons(persons.concat(res.data));
      })
      .catch((err) => {
        console.error(err);
      });

    clearAddFields();
  };

  const peopleToShow = persons.filter((person) => person.name.toLowerCase().includes(searchValue.toLowerCase()));

  useEffect(loadPeople, []);

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
      <Persons
        peopleToShow={peopleToShow}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
