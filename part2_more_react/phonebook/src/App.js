import { useState } from 'react';
import { v4 } from 'uuid';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchValue, setSearchValue] = useState('');

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
