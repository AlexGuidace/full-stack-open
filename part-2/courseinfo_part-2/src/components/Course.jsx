/* eslint-disable react/prop-types */
import Header from './Header';
import Content from './Content';

const Course = ({ courseData }) => {
  return (
    <>
      <Header name={courseData.name} />
      <Content parts={courseData.parts} />
    </>
  );
};

export default Course;
