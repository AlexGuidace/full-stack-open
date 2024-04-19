import { useState } from 'react';
import Header from './components/Header';
import SearchFilter from './components/SearchFilter';
import NewEntryForm from './components/NewEntryForm';
import Persons from './components/Persons';
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
    const name = e.target.value;
    setNewName(name);
  };

  const handleNumberChange = (e) => {
    const number = e.target.value;
    setNewNumber(number);
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

    // Remove extra whitespace for persons array person duplication check and to prevent extra white space in person properties. Lowercase name for consistency across names in array.
    const name = newName.trim().toLowerCase();
    const number = newNumber.trim();

    // If either form fields only contain empty strings, we notify and prevent the user from submitting and reset the inputs.
    if (name === '' || number === '') {
      alert('Both name and phone number fields must be filled in.');
      setNewName('');
      setNewNumber('');
      return;
    }

    // Check current array of people to see if the person being added is already in it. If they are, alert the user and don't add the new person to the array.
    const isPersonInArray = persons.some((person) => person.name === name);
    if (isPersonInArray) {
      alert(`${name} is already in the phonebook.`);
      setNewName('');
      return;
    }

    id += 1;
    const newPerson = { id: id, name: name, number: number };
    const personsCopy = [...persons, newPerson];

    setPersons(personsCopy);
    setNewName('');
    setNewNumber('');
  };

  // On each render, show a list according to whether a user searched for a person and a match was found in handleSearchTerm().
  const personsToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(searchTerm)
      );

  return (
    <>
      <Header title={'Phonebook'} />
      <SearchFilter value={searchTerm} onChange={handleSearchTerm} />
      <Header title={'New Entry:'} />
      <NewEntryForm
        onSubmit={addPhoneNumbers}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        nameValue={newName}
        numberValue={newNumber}
      />
      <Header title={'List of Phone Numbers:'} />
      <Persons persons={personsToShow} />
    </>
  );
};

export default App;
