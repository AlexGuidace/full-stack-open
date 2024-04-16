/* eslint-disable react/prop-types */
import Course from './components/Course';

// const Total = ({ sum }) => <p>Number of exercises {sum}</p>;

const App = () => {
  const courseData = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course courseData={courseData} />;
};

export default App;
