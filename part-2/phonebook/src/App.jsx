import { useState } from 'react';
import Header from './components/Header';
import './styles/global.css';

// A person's updatable id used for unique keys in li elements.
let id = 0;

const App = () => {
  const [persons, setPersons] = useState([{ id: id, name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const addPhoneNumbers = (e) => {
    e.preventDefault();

    // Check current array of people to see if the person being added is already in it. If they are, alert the user and don't add the new person to the array.
    const isPersonInArray = persons.some((person) => person.name === newName);
    if (isPersonInArray) {
      alert(`${newName} is already in the phonebook.`);
      setNewName('');
      return;
    }

    id += 1;
    const newPerson = { id: id, name: newName, number: newNumber };
    const personsCopy = [...persons, newPerson];

    setPersons(personsCopy);
  };

  console.log(persons);

  return (
    <div>
      <Header title={'Phonebook'} />
      <form onSubmit={addPhoneNumbers}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Phone Number:{' '}
          <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">Add Person</button>
        </div>
      </form>
      <Header title={'List of Phone Numbers:'} />
      <ul>
        {persons.map((person) => (
          <li key={person.id}>
            {person.name}: {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
