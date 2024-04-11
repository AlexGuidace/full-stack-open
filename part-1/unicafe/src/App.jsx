/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import './styles/global.css';

const Button = ({ name, onClick }) => {
  return <button onClick={() => onClick(name)}>{name}</button>;
};

const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

const App = () => {
  const [goodClicks, setGoodClicks] = useState(0);
  const [neutralClicks, setNeutralClicks] = useState(0);
  const [badClicks, setBadClicks] = useState(0);

  // Sets total number of clicks for any given feedback button.
  const handleClick = (name) => {
   switch (name) {
     case 'Good':
       setGoodClicks(goodClicks + 1);
       //   setTotalClicks(calculateTotalClicks());
       break;
     case 'Neutral':
       setNeutralClicks(neutralClicks + 1);
       break;
     case 'Bad':
       setBadClicks(badClicks + 1);
       break;
     default:
       console.log(`Something went wrong while clicking the ${name} button.`);
       break;
   }
 };

  const calculateTotalClicks = () => goodClicks + neutralClicks + badClicks;

  const calculateAverageRating = () => {
    let averageRating;
    const goodRating = 1;
    const neutralRating = 0;
    const badRating = -1;

    const goodScore = goodRating * goodClicks;
    const neutralScore = neutralRating * neutralClicks;
    const badScore = badRating * badClicks;

    const scoreSum = goodScore + neutralScore + badScore;

    if (totalClicks === 0) {
      averageRating =
        'The restaurant does not yet have a rating, since no clicks have been made.';
    } else {
      averageRating = scoreSum / totalClicks;
    }

    return averageRating;
  };

  const calculatePositiveFeedbackPercentage = () => {
    let feedbackPercentage;

    if (totalClicks === 0) {
      feedbackPercentage = 'The restaurant has not received any feedback yet.';
    } else {
      feedbackPercentage = (goodClicks / totalClicks * 100) + '%';
    }

    return feedbackPercentage;
  };

  const totalClicks = calculateTotalClicks();
  const unicafeAverageRating = calculateAverageRating();
  const positiveFeedbackPercentage = calculatePositiveFeedbackPercentage();

  return (
    <>
      <Header title="Give Feedback about Your Experience at Unicafe:" />
      <div className="flexDiv">
        <Button name="Good" onClick={handleClick} />
        <Button name="Neutral" onClick={handleClick} />
        <Button name="Bad" onClick={handleClick} />
      </div>
      <Header title="Overall Feedback Statistics:" />
      <div className="flexDiv">
        <div>Number of Good Clicks: {goodClicks}</div>
        <div>Number of Neutral Clicks: {neutralClicks}</div>
        <div>Number of Bad Clicks: {badClicks}</div>
        <div>Total Clicks: {totalClicks}</div>
        <div>Average Restaurant Rating Score: {unicafeAverageRating}</div>
        <div>Positive Feedback Percentage: {positiveFeedbackPercentage}</div>
      </div>
    </>
  );
};

export default App;
