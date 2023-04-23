import './App.scss';
import { Route, Switch } from 'react-router-dom';
import Game from './Pages/Game';
import Header from './Components/Header';
import Rules from './Pages/Rules';
import Home from './Pages/Home';

function App() {
  
  return (
    <div className="App">
      {/* <Home /> */}
      <Header />
      <Switch>
        <Route exact path="/">
          <Game />
        </Route>
        <Route path="/rules">
          <Rules />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
