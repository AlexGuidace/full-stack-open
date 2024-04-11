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

const Statistics = ({ goodClicks, neutralClicks, badClicks }) => {
  const calculateTotalClicks = () => goodClicks + neutralClicks + badClicks;

  const calculateAverageRating = () => {
    const goodRating = 1;
    const neutralRating = 0;
    const badRating = -1;

    const goodScore = goodRating * goodClicks;
    const neutralScore = neutralRating * neutralClicks;
    const badScore = badRating * badClicks;

    const scoreSum = goodScore + neutralScore + badScore;

    const averageRating = scoreSum / totalClicks;

    return averageRating;
  };

  const calculatePositiveFeedbackPercentage = () => {
    const feedbackPercentage = (goodClicks / totalClicks) * 100 + '%';

    return feedbackPercentage;
  };

  const totalClicks = calculateTotalClicks();
  const unicafeAverageRating = calculateAverageRating();
  const positiveFeedbackPercentage = calculatePositiveFeedbackPercentage();

  // Set boolean value for conditional JSX rendering based on whether any feedback has been given to UniCafe.
  let hasStatistics;
  if (goodClicks === 0 && neutralClicks === 0 && badClicks === 0) {
    hasStatistics = false;
  } else {
    hasStatistics = true;
  }

  return hasStatistics ? (
    <div className="flexDiv">
      <StatisticLine
        lineText={'Number of Good Clicks:'}
        statisticalValue={goodClicks}
      />
      <StatisticLine
        lineText={'Number of Neutral Clicks:'}
        statisticalValue={neutralClicks}
      />
      <StatisticLine
        lineText={'Number of Bad Clicks:'}
        statisticalValue={badClicks}
      />
      <StatisticLine
        lineText={'Total Clicks:'}
        statisticalValue={totalClicks}
      />
      <StatisticLine
        lineText={'Average Restaurant Rating Score:'}
        statisticalValue={unicafeAverageRating}
      />
      <StatisticLine
        lineText={'Positive Feedback Percentage:'}
        statisticalValue={positiveFeedbackPercentage}
      />
    </div>
  ) : (
    <h3>No Feedback Given.</h3>
  );
};

const StatisticLine = ({ lineText, statisticalValue }) => {
  return (
    <div>
      {lineText} {statisticalValue}
    </div>
  );
};

const App = () => {
  const [goodClicks, setGoodClicks] = useState(0);
  const [neutralClicks, setNeutralClicks] = useState(0);
  const [badClicks, setBadClicks] = useState(0);

  // Adds to the total click-count for a given feedback button.
  const handleClick = (name) => {
    switch (name) {
      case 'Good':
        setGoodClicks(goodClicks + 1);
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

  return (
    <>
      <Header title="Give Feedback about Your Experience at Unicafe:" />
      <div className="flexDiv">
        <Button name="Good" onClick={handleClick} />
        <Button name="Neutral" onClick={handleClick} />
        <Button name="Bad" onClick={handleClick} />
      </div>
      <Header title="Overall Feedback Statistics:" />
      <Statistics
        goodClicks={goodClicks}
        neutralClicks={neutralClicks}
        badClicks={badClicks}
      />
    </>
  );
};

export default App;
