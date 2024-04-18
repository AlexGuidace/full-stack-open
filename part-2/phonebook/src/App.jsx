import { useState } from 'react';
import Header from './components/Header';
import './styles/global.css';

// A person's updatable id used for unique keys in li elements.
let id = 0;

const App = () => {
  const [persons, setPersons] = useState([
    { id: id, name: 'Napoleon Bonaparte', number: '765-208-9943' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearchTerm = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    // Check to see if we found the user's search term in the persons array.
    const personContainingSearchTerm = persons.find((person) =>
      person.name.toLowerCase().includes(searchValue)
    );

    // Set showAll state variable to false for a filtered list of matched people.
    if (personContainingSearchTerm !== undefined) {
      setShowAll(false);
      // Show nothing if the search term entered wasn't matched.
    } else if (personContainingSearchTerm === undefined && searchValue !== '') {
      setShowAll(false);
      // Show all items if there is no text in the search input.
    } else {
      setShowAll(true);
    }
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

  // On each render, show a list according to whether a user searched for a person and a match was found in handleSearchTerm().
  const personsToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(searchTerm)
      );

  return (
    <div>
      <Header title={'Phonebook'} />
      <div>
        Search for a Person:{' '}
        <input
          type="text"
          placeholder="Search... "
          value={searchTerm}
          onChange={handleSearchTerm}
        />
      </div>
      <Header title={'New Entry:'} />
      <form onSubmit={addPhoneNumbers}>
        <div>
          Name:{' '}
          <input type="text" value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Phone Number:{' '}
          <input type="text" value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">Add Person</button>
        </div>
      </form>
      <Header title={'List of Phone Numbers:'} />
      <ul>
        {personsToShow.map((person) => (
          <li key={person.id}>
            {person.name}: {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
