import React, { useState, useEffect } from 'react';

import personsService from './services/personsService';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import Error from './components/Error';

const messageTimeout = 4000;

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const createMessage = (messageString) => {
    setMessage(messageString);
    setTimeout(() => {
      setMessage(null);
    }, messageTimeout);
  };

  const createError = (errorString) => {
    setError(errorString);
    setTimeout(() => {
      setError(null);
    }, messageTimeout);
  };

  const loadPeople = () => {
    personsService.getAll().then((res) => {
      const loadedPersons = res.data;
      setPersons(loadedPersons);
    });
    createMessage('Loaded phonebook');
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
    const personToDelete = persons.find((person) => person.id === event.target.id);
    const confirmDelete = window.confirm(`Are you sure you want to delete ${personToDelete.name}?`);
    if (confirmDelete) {
      personsService.deletePerson(personToDelete.id).then((res) => {
        createMessage(`${res.status}: Successfully deleted the person with the name '${personToDelete.name}' and id '${personToDelete.id}'`);
      }).catch((err) => {
        createError(`${err.response.status} - The person with the name ${personToDelete.name} was already deleted`);
      });
      setPersons(persons.filter((person) => person.id !== personToDelete.id));
    }
  };

  const handleAddNewName = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase());
    if (existingPerson) {
      const replaceNumber = window.confirm(`${newName} already exists, replace the old number with a new one?`);
      if (replaceNumber && newNumber !== '' && newNumber !== null) {
        const newPerson = { ...existingPerson, number: newNumber };
        personsService.update(existingPerson.id, newPerson).then((res) => {
          const changedPerson = res.data;
          const changedPeople = persons.map((person) => (person.id !== changedPerson.id ? person : changedPerson));
          setPersons(changedPeople);
        });
        clearAddFields();
        loadPeople();
      }
      return;
    }

    if (newName === '') {
      createError('You must enter a name!');
      return;
    }

    if (newNumber === '') {
      createError('You must enter a number!');
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personsService.create(newPerson)
      .then((res) => {
        setPersons(persons.concat(res.data));
        createMessage(`'${newPerson.name}' was created with phone number '${newPerson.number}' & id '${newPerson.id}'`);
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
      <Notification message={message} />
      <Error message={error} />
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
