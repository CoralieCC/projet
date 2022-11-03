import { Router } from './Routes/Router';
import './App.css';
import { Header } from './Components/Header';

function App() {
  return (
    <>
        <Header/>
        <main className='main'>
          <Router/>
        </main>
        
    </>
    
  );
}

export default App;