/* eslint-disable react/no-unescaped-entities */
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
  return (
    <div className="styledDiv">
      This anecdote currently has <span>{votes}</span> votes.
    </div>
  );
};

const Heading = ({ title }) => {
  return <h1>{title}:</h1>;
};

const MostVotedAnecdote = ({ mostVotedAnecdote }) => {
  return (
    <>
      {mostVotedAnecdote.anecdote !== '' ? (
        <>
          <p>"{mostVotedAnecdote.anecdote}"</p>
          <div className="styledDiv">
            This anecdote is most popular with{' '}
            <span>{mostVotedAnecdote.votes}</span> votes in total.
          </div>
        </>
      ) : (
        <div className="styledDiv">No votes have been made yet.</div>
      )}
    </>
  );
};

const App = () => {
  // [Quotes taken from here: ](https://www.comp.nus.edu.sg/~damithch/pages/SE-quotes.htm)
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

  // A zero-filled array for the votesArray state variable.
  const initialVotesArray = Array(anecdotes.length).fill(0);
  const heartEmoji = '\u{2764}';

  // State.
  const [currentRandomAnecdote, setCurrentRandomAnecdote] = useState(
    anecdotes[0]
  );
  const [currentAnecdoteIndex, setCurrentAnecdoteIndex] = useState(0);
  const [votesArray, setVotesArray] = useState(initialVotesArray);
  const [currentAnecdoteVotes, setCurrentAnecdoteVotes] = useState(0);
  const [mostVotedAnecdote, setMostVotedAnecdote] = useState({
    anecdote: '',
    votes: 0,
  });

  // Returns a new, randomized anecdote to the user.
  const handleNextAnecdoteClick = () => {
    calculateAndSetRandomAnecdote();
  };

  // Adds a vote to an anecdote displayed to the user and sets the most-voted anecdote.
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
    // Display the most popular anecdote any time the vote button is clicked and the vote count changes for a particular anecdote. Use votesArrayCopy for this since it already contains the most updated values for the votes array, and we don't have to rely on state rendering to get those updated values.
    getMostVotedAnecdote(votesArrayCopy, anecdotes);
  };

  const getMostVotedAnecdote = (votesArrayCopy, anecdotes) => {
    const mostVotes = Math.max(...votesArrayCopy);
    const mostVotedAnecdoteIndex = votesArrayCopy.indexOf(mostVotes);
    const anecdote = anecdotes[mostVotedAnecdoteIndex];

    const anecdoteToBeDisplayed = {
      anecdote: anecdote,
      votes: mostVotes,
    };

    setMostVotedAnecdote(anecdoteToBeDisplayed);
  };

  const calculateAndSetRandomAnecdote = () => {
    // Get a random integer--used to access an individual anecdote in the anecdotes array--based on the array's length.
    let randomIndex = Math.floor(Math.random() * anecdotes.length);

    // We don't want to display the same anecdote consecutively, so we add a check here for that.
    while (randomIndex === currentAnecdoteIndex) {
      randomIndex = Math.floor(Math.random() * anecdotes.length);
    }

    // Set the currentAnecdoteIndex state for subsequent calls to this function and for use in handling anecdote votes.
    setCurrentAnecdoteIndex(randomIndex);
    // Get total number of votes for this anecdote to display to the user.
    setCurrentAnecdoteVotes(votesArray[randomIndex]);
    // Assign the new anecdote to the randomAnecdote state.
    setCurrentRandomAnecdote(anecdotes[randomIndex]);
  };

  return (
    <>
      <Heading title={'Anecdote of the Day'} />
      <Anecdote text={currentRandomAnecdote} />
      <Votes votes={currentAnecdoteVotes} />
      <Button
        name={`I ${heartEmoji} this anecdote!`}
        onClick={handleVoteClick}
      />
      <Button name={'Next Anecdote'} onClick={handleNextAnecdoteClick} />
      <Heading title={'Anecdote with Most Votes'} />
      <MostVotedAnecdote mostVotedAnecdote={mostVotedAnecdote} />
    </>
  );
};

export default App;
