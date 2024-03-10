const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ content }) => {
  return (
    <>
      <Part partData={content[0]} />
      <Part partData={content[1]} />
      <Part partData={content[2]} />
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

const Total = ({ totalExercises }) => {
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

  const totalExercises =
    parts[0].exercises + parts[1].exercises + parts[2].exercises;

  return (
    <div>
      <Header course={course} />
      <Content content={parts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;
