import Player from '../Player/Player';
import logo from '../../images/moveo-logo.svg';
import './App.css';

function App() {
  return (
    <div className='App'>
      <main className='main'>
        <img src={logo} alt='moveo group' className='logo' />
        <Player />
      </main>
    </div>
  );
}

export default App;
