import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Game from './Pages/Game';
import Header from './Components/Header';
import Rules from './Pages/Rules';

function App() {
  
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Game />}>
        </Route>
        <Route path="/rules" element={<Rules />}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
