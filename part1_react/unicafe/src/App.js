import { useState } from 'react';

const Feedback = ({ type, score }) => {
  return (
    <p>
      {type} {score}
    </p>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  function handleClick(event) {
    event.preventDefault();
    switch (event.target.innerHTML) {
      case 'good':
        setGood(good + 1);
        break;
      case 'neutral':
        setNeutral(neutral + 1);
        break;
      case 'bad':
        setBad(bad + 1);
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <h1>give feedback</h1>
      <form>
        <button onClick={handleClick}>good</button>
        <button onClick={handleClick}>neutral</button>
        <button onClick={handleClick}>bad</button>
      </form>
      <h2>statistics</h2>
      <Feedback type='good' score={good} />
      <Feedback type='neutral' score={neutral} />
      <Feedback type='bad' score={bad} />
    </div>
  );
};

export default App;
