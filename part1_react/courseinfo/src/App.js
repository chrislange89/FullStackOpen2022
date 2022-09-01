const Course = (props) => {
  return <h1>{props.course.name}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = (props) => {
  // assume there are only three items
  return (
    <div>
      <Part key={props.parts[0].name} part={props.parts[0]} />
      <Part key={props.parts[1].name} part={props.parts[1]} />
      <Part key={props.parts[2].name} part={props.parts[2]} />
    </div>
  );
};

const Total = (props) => {
  //assume only three parts
  return (
    <p>
      Number of exercises
      {props.parts[0].exercises +
        props.parts[1].exercises +
        props.parts[2].exercises}
    </p>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Course course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
