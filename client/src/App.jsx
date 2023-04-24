import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Game from './Pages/Game';
import Header from './Components/Header';
import Rules from './Pages/Rules';
import Login from './Pages/Login';
import Register from './Pages/Register';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />}>
        </Route>
        <Route path="/register" element={<Register />}>
        </Route>
        <Route exact path="/game" element={
          <>
            <Header />
            <Game />
          </>
        }>
        </Route>
        <Route exact path="/game/rules" element={
          <>
            <Header />
            <Rules />
          </>
        }>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
