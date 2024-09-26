const Hello = (props) => {
  console.log(props);
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  );
};

const App = () => {
  const name = "Michiel";
  const age = 19;
  return (
    <>
      <h1>Greetings</h1>
      <Hello name={name} age={age}/>
      <Hello name="ThomasVis" age="18"/>
      <Hello name="JulieVis" age={19+2}/>
    </>
  );
};

export default App;