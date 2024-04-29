import { useState, useEffect } from 'react';

import Header from './components/Header';
import SearchFilter from './components/SearchFilter';
import NewEntryForm from './components/NewEntryForm';
import Persons from './components/Persons';
import personsService from './services/personsService';
import './styles/global.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // When the app mounts, seed the person's array with the JSON-server DB data.
  useEffect(() => {
    personsService
      .getPersons()
      .then((persons) => {
        setPersons(persons);
      })
      .catch((error) => {
        alert(`There was an error getting all people in the phonebook.`);
        console.log(`There was an error in getting all persons: ${error}`);
      });
  }, []);

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
    } else if (personContainingSearchTerm === undefined) {
      setShowAll(false);
      // Show all items if there is no text in the search input.
    } else {
      setShowAll(true);
    }
  };

  const handleDeletePerson = (person) => {
    // Open modal allowing user to delete a person entry.
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .deletePerson(person.id)
        .then((deletedPerson) => {
          alert(`${deletedPerson.name} successfully deleted!`);
          // After the person is deleted, update persons in the UI.
          const personsCopy = persons.filter(
            (person) => person.id !== deletedPerson.id
          );
          setPersons(personsCopy);
        })
        .catch((error) => {
          alert(`${person.name} wasn't deleted due to an error.`);
          console.log(`Person deletion did not occur due to: ${error}`);
        });
    }
  };

  const addEntry = (e) => {
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
      // Get the person object.
      const person = persons.find((person) => person.name === name);
      // Open modal allowing user to replace a person's phone number.
      if (
        window.confirm(
          `${person.name} is already in the phonebook. Replace the old number with this new one?`
        )
      ) {
        personsService
          .updatePersonNumber(person, number)
          .then((updatedPerson) => {
            alert(`${updatedPerson.name} successfully updated!`);
            // After the person is updated, update persons in the UI.
            personsService
              .getPersons()
              .then((persons) => {
                setPersons(persons);
              })
              .catch((error) => {
                alert(
                  `There was an error getting all people in the phonebook.`
                );
                console.log(
                  `There was an error in getting all persons: ${error}`
                );
              });

            setNewName('');
            setNewNumber('');
          })
          .catch((error) => {
            alert(
              `${person.name}'s phone number wasn't updated due to an error.`
            );
            console.log(`Person number update did not occur due to: ${error}`);
          });
      }

      return;
    }

    const newPerson = { name: name, number: number };

    // Add new person entry to JSON-server and update the UI with an updated persons array.
    personsService
      .createPerson(newPerson)
      .then((person) => {
        setPersons(persons.concat(person));
        setNewName('');
        setNewNumber('');
      })
      .catch((error) => {
        alert(`${newPerson.name} wasn't added due to an error.`);
        console.log(`Person creation did not occur due to: ${error}`);
      });
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
        onSubmit={addEntry}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        nameValue={newName}
        numberValue={newNumber}
      />
      <Header title={'List of Phone Numbers:'} />
      <Persons
        persons={personsToShow}
        onDeletePersonClick={handleDeletePerson}
      />
    </>
  );
};

export default App;
