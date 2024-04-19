/* eslint-disable react/prop-types */
const Person = ({ person }) => (
  <li>
    {person.name}: {person.number}
  </li>
);

export default Person;
