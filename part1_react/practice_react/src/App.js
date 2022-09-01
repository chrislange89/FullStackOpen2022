const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old!</p>
    </div>
  );
};

const App = () => {
  const name = "Guy";
  const age = 18;

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name={name} age={age} />
      <Hello name="Person" age={321 + (7 / 2)} />
    </div>
  );
};

export default App;
