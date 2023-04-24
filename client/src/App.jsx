import './App.scss';
import { Route, Switch } from 'react-router-dom';
import Game from './Pages/Game';
import Header from './Components/Header';
import Rules from './Pages/Rules';
import Login from './Pages/Login';
import Register from './Pages/Register';

function App() {

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route exact path="/game">
          <Header />
          <Game />
        </Route>
        <Route path="/game/rules">
          <Rules />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
