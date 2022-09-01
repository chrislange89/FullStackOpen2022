import { useState } from 'react';

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const noFeedback = <p>No Feedback Given</p>;
  const haveFeedback = (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='total' value={total} />
          <StatisticLine text='average' value={Math.round(total / 3)} />
          <StatisticLine text='positive' value={`${Math.round((good / total) * 100)}%`} />
        </tbody>
      </table>
    </div>
  );

  return total === 0 ? noFeedback : haveFeedback;
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
        <Button text="good" handleClick={handleClick} />
        <Button text="neutral" handleClick={handleClick} />
        <Button text="bad" handleClick={handleClick} />
      </form>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
