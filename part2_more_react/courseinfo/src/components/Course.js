const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => {
        return <Part key={part.id} part={part} />;
      })}
    </div>
  );
};

const Total = ({ parts }) => {
  let exercises = parts.reduce((accumulator, curValue) => {
    return accumulator + curValue.exercises;
  }, 0);

  return (
    <p>
      <strong>total of {exercises} exercises</strong>
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <h2>{course.name}</h2>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
