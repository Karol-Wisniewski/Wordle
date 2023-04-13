import './App.scss';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import Game from './Pages/Game';
import Header from './Components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <Game />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
