const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Content = ({ course }) => {
  return (
    <>
      <Part partData={course.parts[0]} />
      <Part partData={course.parts[1]} />
      <Part partData={course.parts[2]} />
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

const Total = ({ course }) => {
  const totalExercises =
    course.parts[0].exercises +
    course.parts[1].exercises +
    course.parts[2].exercises;

  return <p>Number of exercises: {totalExercises} </p>;
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default App;
