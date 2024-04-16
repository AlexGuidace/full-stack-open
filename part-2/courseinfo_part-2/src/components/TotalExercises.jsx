/* eslint-disable react/prop-types */
const TotalExercises = ({ parts }) => {
  const total = parts.reduce((results, part) => results + part.exercises, 0);

  return <p>The course has a total of {total} exercises.</p>;
};

export default TotalExercises;
