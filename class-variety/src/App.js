import logo from './logo.svg';
import './App.css';
import useHook from './useHook';

function App() {

  const [count, increment, decrement] = useHook() 
  return (
    <div className="App">
      <button onClick={increment}>Increment</button>
      <h1>{count}</h1>
      <button disabled={count <= 0 ? true : false} onClick={decrement}>Decrement</button>
    </div>
  );
}

export default App;
