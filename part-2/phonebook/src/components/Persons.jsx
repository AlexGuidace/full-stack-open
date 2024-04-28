/* eslint-disable react/prop-types */
import Person from './Person';

const Persons = ({ persons, onDeletePersonClick }) => (
  <ul>
    {persons.map((person) => (
      <Person
        key={person.id}
        person={person}
        onDeletePersonClick={onDeletePersonClick}
      />
    ))}
  </ul>
);

export default Persons;
