import logo from './logo.svg';
import './App.css';
import { useCallback, useMemo, useState } from 'react';

function App({ toggle }) {

  const [clicked, setClicked] = useState(false);
  console.log('component re rendered')
  const calculatedValue = useMemo(() => {
    let calculation = 0;
    console.time('calculate value');
    for(let i = 0; i < 10000000; i++){
      calculation += i;
    }
    console.timeEnd('calculate value');
    return calculation;
  }, []);

 


  const handleClick = useCallback(() => {
    setClicked(!clicked);
  }, [clicked]);

  console.log({calculatedValue, handleClick})
  return (
    <div className="App">
      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Toggle: {`${toggle}`}
        </p>
        <p>
          clicked: {`${clicked}`}
        </p>
        <p>
          calculatedValue: {calculatedValue}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={handleClick}>Click me!</button>
      </header>
    </div>
  );
}

export default App;
