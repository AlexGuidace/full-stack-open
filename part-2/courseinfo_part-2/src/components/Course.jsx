/* eslint-disable react/prop-types */
import Header from './Header';
import Content from './Content';
import TotalExercises from './TotalExercises';

const Course = ({ courseData }) => {
  return (
    <>
      <Header name={courseData.name} />
      <Content parts={courseData.parts} />
      <TotalExercises parts={courseData.parts} />
    </>
  );
};

export default Course;
