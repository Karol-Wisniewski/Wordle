import '../App.scss';
import green from '../Utils/green-example.PNG';
import yellow from '../Utils/yellow-example.PNG';
import grey from '../Utils/grey-example.PNG';

function Rules() {
  return (
    <div className="Rules">
        <h1>How To Play</h1>
        <p>Guess the wordle in 6 tries.</p>
        <h2>Examples</h2>
        <img src={green} alt="green-example" />
        <p>Green tiles are correct letters in the correct position.</p>
        <img src={yellow} alt="yellow-example" />
        <p>Yellow tiles are correct letters in the wrong position.</p>
        <img src={grey} alt="grey-example" />
        <p>Grey tiles are incorrect letters.</p>
    </div>
  );
}

export default Rules;
