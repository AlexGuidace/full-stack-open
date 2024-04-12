/* eslint-disable react/prop-types */
import { useState } from 'react';
import './styles/global.css';

const Anecdote = ({ text }) => {
  // eslint-disable-next-line react/no-unescaped-entities
  return <p>"{text}"</p>;
};

const Button = ({ name, onClick }) => {
  return <button onClick={onClick}>{name}</button>;
};

const Votes = ({ votes }) => {
  return <div>This anecdote currently has {votes} votes.</div>;
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

  const initialVotesArray = Array(anecdotes.length).fill(0);

  const [randomAnecdote, setRandomAnecdote] = useState(anecdotes[0]);
  const [currentAnecdoteIndex, setCurrentAnecdoteIndex] = useState(0);
  const [votesArray, setVotesArray] = useState(initialVotesArray);
  const [currentAnecdoteVotes, setCurrentAnecdoteVotes] = useState(0);

  // Returns a new, randomized anecdote to the user.
  const handleNextAnecdoteClick = () => {
    calculateAndSetRandomAnecdote();
  };

  // Adds a vote to an anecdote displayed to the user.
  const handleVoteClick = () => {
    const votesArrayCopy = [...votesArray];
    //  Add 1 to the total current number of votes for this anecdote.
    const currentAnecdoteVotesValue = (votesArrayCopy[
      currentAnecdoteIndex
    ] += 1);

    // Get updated number of votes for this anecdote to display to the user.
    setCurrentAnecdoteVotes(currentAnecdoteVotesValue);
    // Set the votes array to the new updated array.
    setVotesArray(votesArrayCopy);
  };

  console.log(votesArray);

  const calculateAndSetRandomAnecdote = () => {
    // Get a random integer--used to access an individual anecdote in the anecdotes array--based on the array's length.
    let randomIndex = Math.floor(Math.random() * anecdotes.length);

    // We don't want to display the same quote consecutively, so we add a check here for that.
    while (randomIndex === currentAnecdoteIndex) {
      randomIndex = Math.floor(Math.random() * anecdotes.length);
    }

    // Set the currentAnecdoteIndex state for subsequent calls to this function and for use in handling anecdote votes.
    setCurrentAnecdoteIndex(randomIndex);
    // Get total number of votes for this anecdote to display to the user.
    setCurrentAnecdoteVotes(votesArray[randomIndex]);
    // Assign the new anecdote to the randomAnecdote state.
    setRandomAnecdote(anecdotes[randomIndex]);
  };

  return (
    <>
      <Anecdote text={randomAnecdote} />
      <Votes votes={currentAnecdoteVotes} />
      <Button name={'I love this anecdote!'} onClick={handleVoteClick} />
      <Button name={'Next Anecdote'} onClick={handleNextAnecdoteClick} />
    </>
  );
};

export default App;
