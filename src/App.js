import logo from './logo.svg';
import './App.css';
import MainSwap from './components/MainSwap'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <MainSwap />
      </header>
    </div>
  );
}

export default App;
