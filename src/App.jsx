//experimentation based on https://react.dev/reference/react/memo#minimizing-props-changes
import React, {memo, useMemo, useState} from 'react';

const Profile = memo(function Profile({ person }) {
  console.log("<Profile /> rendered");
});

function Page() {
  console.log("<Page /> rendered");
  const [name, setName] = useState('Taylor');
  const [age, setAge] = useState(42);
  // const person = {name, age}
  const person = useMemo(
    () => ({ name, age }),
    [name, age]
  );
  return <Profile person={person} />;
}

export function App(props) {
  console.log("<App /> rendered");
  const [number, setNumber] = useState(0);
  function handleClick(){
    setNumber((prevNumber) => prevNumber + 1);
  }
  return (
    <div className='App'>
      <button onClick={handleClick}>+</button> <span>{number}</span>
      <Page/>
    </div>
  );
}
