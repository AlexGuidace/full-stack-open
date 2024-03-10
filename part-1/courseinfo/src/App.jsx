const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ content }) => {
  return (
    <>
      <Part partExerciseData={content[0]} />
      <Part partExerciseData={content[1]} />
      <Part partExerciseData={content[2]} />
    </>
  );
};

const Part = ({ partExerciseData }) => {
  return (
    <p>
      {partExerciseData.name} {partExerciseData.exercises}
    </p>
  );
};

const Total = ({ totalExercises }) => {
  return <p>Number of exercises: {totalExercises} </p>;
};

const App = () => {
  const course = 'Half Stack application development';
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10,
  };
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7,
  };
  const part3 = {
    name: 'State of a component',
    exercises: 14,
  };
  const totalExercises = part1.exercises + part2.exercises + part3.exercises;

  return (
    <div>
      <Header course={course} />
      <Content content={[part1, part2, part3]} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;
