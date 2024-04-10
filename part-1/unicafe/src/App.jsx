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
      <div className="flexDiv">
        <div>Number of Good Clicks: {goodClicks}</div>
        <div>Number of Neutral Clicks: {neutralClicks}</div>
        <div>Number of Bad Clicks: {badClicks}</div>
      </div>
    </>
  );
};

export default App;
