/* eslint-disable react/prop-types */
import { useState } from 'react';

const Quote = ({ text }) => {
  // eslint-disable-next-line react/no-unescaped-entities
  return <p>"{text}"</p>;
};

const Button = ({ name, onClick }) => {
  return <button onClick={onClick}>{name}</button>;
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const [randomAnecdote, setRandomAnecdote] = useState(anecdotes[0]);
  const [previousRandomNumber, setPreviousRandomNumber] = useState(0);

  // Returns a new, randomized anecdote to the user.
  const handleClick = () => {
    calculateAndSetRandomAnecdote();
  };

  const calculateAndSetRandomAnecdote = () => {
    // Get a random integer based on the anecdotes array length.
    let randomNumber = Math.floor(Math.random() * anecdotes.length);

    // We don't want to display the same quote consecutively, so we add a check here for that.
    while (randomNumber === previousRandomNumber) {
      randomNumber = Math.floor(Math.random() * anecdotes.length);
    }

    setPreviousRandomNumber(randomNumber);
    setRandomAnecdote(anecdotes[randomNumber]);
  };

  return (
    <>
      <Quote text={randomAnecdote} />
      <Button name={'Next Anecdote'} onClick={handleClick} />
    </>
  );
};

export default App;
