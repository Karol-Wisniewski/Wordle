import "../App.scss";

const VirtualKeyboard = ({ onKeyPress, usedLetters }) => {
  const letters = 'QWERTYUIOPASDFGHJKLZXCVBNMĄĆĘŁŃÓŚŹŻ';

  const handleClick = (letter) => {
    onKeyPress(letter);
  };

  return (
    <div className="virtual-keyboard">
      {letters.split('').map((letter) => (
        <button
          key={letter}
          className={`key ${usedLetters[letter]}`}
          onClick={() => handleClick(letter)}
        >
          {letter.toUpperCase()}
        </button>
      ))}
      <button className="key key-backspace" onClick={() => onKeyPress('Backspace')}>
        ⌫
      </button>
      <button className="key key-enter" onClick={() => onKeyPress('Enter')}>
        Enter &nbsp;↵
      </button>
    </div>
  );
};

export default VirtualKeyboard;