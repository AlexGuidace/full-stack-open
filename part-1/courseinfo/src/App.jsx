const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ parts }) => {
  return (
    <>
      <Part partData={parts[0]} />
      <Part partData={parts[1]} />
      <Part partData={parts[2]} />
    </>
  );
};

const Part = ({ partData }) => {
  return (
    <p>
      {partData.name} {partData.exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  const totalExercises =
    parts[0].exercises + parts[1].exercises + parts[2].exercises;

  return <p>Number of exercises: {totalExercises} </p>;
};

const App = () => {
  const course = 'Half Stack application development';
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10,
    },
    {
      name: 'Using props to pass data',
      exercises: 7,
    },
    {
      name: 'State of a component',
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
