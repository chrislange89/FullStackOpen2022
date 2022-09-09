import React from 'react';

function PersonForm({
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
  handleAddNewName,
}) {
  return (
    <form>
      <div>
        {'name: '}
        <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        {'number: '}
        <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={handleAddNewName}>
          add
        </button>
      </div>
    </form>
  );
}

export default PersonForm;
