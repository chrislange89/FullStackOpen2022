import { useState } from 'react';

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
    if (!nameExists) {
      let newPerson = {
        name: newName,
      };
      setPersons(persons.concat(newPerson));
      setNewName('');
      return;
    }

    alert(`Cannot add ${newName}, this person already exists!`);
  }

  const peopleToShow = persons.filter((person) => person.name.includes(searchValue));

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input value={searchValue} onChange={handleSearchChange}/></div>
      <h2>add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type='submit' onClick={handleAddNewName}>
            add
          </button>
        </div>
      </form>
      <h2>Contacts</h2>
      <ul>
        {peopleToShow.map((person) => (
          <li key={person.id}>
            {person.name} - {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
