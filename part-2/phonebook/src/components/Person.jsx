/* eslint-disable react/prop-types */
const Person = ({ person, onDeletePersonClick }) => (
  <li>
    {person.name}: {person.number}{' '}
    <button onClick={() => onDeletePersonClick(person)}>Delete</button>
  </li>
);

export default Person;
