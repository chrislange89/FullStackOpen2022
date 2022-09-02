import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [votes, setVotes] = useState(Array.from(anecdotes.map(item => 0)));
  const [selected, setSelected] = useState(0);

  const handleNext = (event) => {
    event.preventDefault();
    setSelected((selected === anecdotes.length - 1) ? 0 : selected + 1);
  }

  const handleRandom = (event) => {
    event.preventDefault();
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }

  const handleVote = (event) => {
    event.preventDefault();
    let newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>
        {anecdotes[selected]}
      </p>
      <p>
        has {votes[selected]} votes
      </p>
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleNext}>Next anecdote</button>
      <button onClick={handleRandom}>Random anecdote</button>
      <h2>Anecdote with the most votes</h2>
      <p>
      {anecdotes[votes.indexOf(Math.max.apply(null, votes))]}
      </p>
      <p>has {Math.max.apply(null, votes)} votes</p>
    </div>
  )
}

export default App