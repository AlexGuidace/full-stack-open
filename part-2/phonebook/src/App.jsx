import { useState, useEffect } from 'react';

import Header from './components/Header';
import SearchFilter from './components/SearchFilter';
import NewEntryForm from './components/NewEntryForm';
import Persons from './components/Persons';
import personsService from './services/personsService';
import Notification from './components/Notification';
import './styles/global.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);
  const [isErrorNotification, setIsErrorNotification] = useState(false);

  // When the app mounts, seed the person's array with the JSON-server DB data.
  useEffect(() => {
    personsService
      .getPersons()
      .then((persons) => {
        setPersons(persons);
      })
      .catch((error) => {
        alert(`There was an error getting all people in the phonebook.`);
        console.log(`There was an error in getting all persons: '${error}'`);
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
          // After the person is deleted, update persons in the UI.
          const personsCopy = persons.filter(
            (person) => person.id !== deletedPerson.id
          );

          setPersons(personsCopy);
          setIsErrorNotification(false);
          setNotification(
            `${deletedPerson.name} was deleted from the phonebook.`
          );
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
        .catch((error) => {
          setIsErrorNotification(true);
          setNotification(
            `${person.name} wasn't deleted from the phonebook due to an error.`
          );
          setTimeout(() => {
            setNotification(null);
          }, 5000);
          console.log(`Person deletion did not occur due to: '${error}'`);
        });
    }
  };

  const addEntry = (e) => {
    e.preventDefault();

    // Remove extra whitespace for persons array person duplication check and to prevent extra white space in person properties. Lowercase entry to prevent duplication due to case sensitivity.
    const name = newName.trim().toLowerCase();
    const number = newNumber.trim();

    // If either form fields only contain empty strings, we notify and prevent the user from submitting.
    if (name === '' || number === '') {
      alert('Both name and phone number fields must be filled in.');
      return;
    }

    // Check current array of people to see if the person being added is already in it. If they are, alert the user and don't add the new person to the array.
    const isPersonInArray = persons.some(
      (person) => person.name.toLowerCase() === name
    );
    if (isPersonInArray) {
      // Get the person object.
      const person = persons.find(
        (person) => person.name.toLowerCase() === name
      );
      // Open modal allowing user to replace a person's phone number.
      if (
        window.confirm(
          `${person.name} is already in the phonebook. Replace the old number with this new one?`
        )
      ) {
        personsService
          .updatePersonNumber(person, number)
          .then((updatedPerson) => {
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
                  `There was an error in getting all persons: '${error}'`
                );
              });

            setNewName('');
            setNewNumber('');
            setIsErrorNotification(false);
            setNotification(`${updatedPerson.name}'s number was updated.`);
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          })
          .catch((error) => {
            setIsErrorNotification(true);
            setNotification(
              `${person.name} wasn't updated due to an error: "${error.response.data.error}"`
            );
            setTimeout(() => {
              setNotification(null);
            }, 5000);
            console.log(
              `Person number update did not occur due to: '${error}'`
            );
          });
      }

      return;
    }

    // Capitalize the name of the person in the new entry.
    const capitalizedName = capitalizeName(name);
    const newPerson = { name: capitalizedName, number: number };

    // Add new person entry to JSON-server and update the UI with an updated persons array.
    personsService
      .createPerson(newPerson)
      .then((person) => {
        setPersons(persons.concat(person));
        setNewName('');
        setNewNumber('');
        setIsErrorNotification(false);
        setNotification(`${person.name} was added to the phonebook.`);
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      })
      .catch((error) => {
        setIsErrorNotification(true);
        setNotification(
          `${newPerson.name} wasn't added to the phonebook due to an error: "${error.response.data.error}"`
        );
        setTimeout(() => {
          setNotification(null);
        }, 5000);
        console.log(
          `Person creation did not occur due to: '${error.response.data.error}'`
        );
      });
  };

  const capitalizeName = (name) => {
    let capitalizedName = '';
    const nameArray = name.split(/\s+/);

    nameArray.forEach((word) => {
      const firstLetter = word[0].toUpperCase();
      const partialWord = word.substring(1);
      const uppercasedWord = firstLetter + partialWord;
      capitalizedName += uppercasedWord + ' ';
    });

    return capitalizedName.trim();
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
      <Notification isError={isErrorNotification} message={notification} />
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
