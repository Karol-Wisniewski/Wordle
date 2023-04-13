import '../App.scss';
import Row from '../Components/Row';

function Game() {
  return (
    <div className="Game">
      <div className="game-div">
        <div className="rows-div">
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
        </div>
        <div className="keyboard-div">

        </div>
      </div>
    </div>
  );
}

export default Game;
