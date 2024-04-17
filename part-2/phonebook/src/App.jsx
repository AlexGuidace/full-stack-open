import { useState } from 'react';
import Header from './components/Header';
import './styles/global.css';

// A person's updatable id used for unique keys in li elements.
let id = 0;

const App = () => {
  const [persons, setPersons] = useState([{ id: id, name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const addNumbers = (e) => {
    e.preventDefault();

    // Update a person's id for each new person added.
    id += 1;
    const newPerson = { id: id, name: newName };
    const personsCopy = [...persons, newPerson];

    setPersons(personsCopy);
  };

  console.log(persons);

  return (
    <div>
      <Header title={'Phonebook'} />
      <form onSubmit={addNumbers}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Header title={'Numbers'} />
      <ul>
        {persons.map((person) => (
          <li key={person.id}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
