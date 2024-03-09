const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ content }) => {
  return (
    <>
      <p>
        {content[0].partTitle} {content[0].exercises}
      </p>
      <p>
        {content[1].partTitle} {content[1].exercises}
      </p>
      <p>
        {content[2].partTitle} {content[2].exercises}
      </p>
    </>
  );
};

const Total = ({ totalExercises }) => {
  return <p>Number of exercises: {totalExercises} </p>;
};

const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;
  const totalExercises = exercises1 + exercises2 + exercises3;

  return (
    <div>
      <Header course={course} />
      <Content
        content={[
          { partTitle: part1, exercises: exercises1 },
          { partTitle: part2, exercises: exercises2 },
          { partTitle: part3, exercises: exercises3 },
        ]}
      />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;
