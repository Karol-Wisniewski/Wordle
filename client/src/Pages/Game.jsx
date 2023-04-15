import '../App.scss';
import { useState, useEffect, useRef } from 'react';
import React from 'react';
import words from '../Components/Words.js';

function Game() {

  const [activeRow, setActiveRow] = useState(0);

  const [msg, setMsg] = useState('');

  const [word, setWord] = useState('');

  const [gameEnded, setGameEnded] = useState(false);

  const [rows, setRows] = useState([
    { input1: '', input2: '', input3: '', input4: '', input5: '' },
    { input1: '', input2: '', input3: '', input4: '', input5: '' },
    { input1: '', input2: '', input3: '', input4: '', input5: '' },
    { input1: '', input2: '', input3: '', input4: '', input5: '' },
    { input1: '', input2: '', input3: '', input4: '', input5: '' },
    { input1: '', input2: '', input3: '', input4: '', input5: '' },
  ]);

  const inputRefs = useRef(
    [
      React.createRef(), 
      React.createRef(), 
      React.createRef(), 
      React.createRef(),
      React.createRef()
    ]
  );

  function goToTheNextRow() {
    if (activeRow < rows.length - 1) {
      setActiveRow((prevActiveRow) => prevActiveRow + 1);
    } else {
      setMsg('Game over!');
      setGameEnded(true);
    }
  }

  function handleInputChange(event, inputId, index) {
    const value = event.target.value;

    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[activeRow] = {
        ...updatedRows[activeRow],
        [inputId]: value,
      };
      return updatedRows;
    });
  
    // Focus on the next input when a letter is entered
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].current.focus();
    }  
  }  

  function handleKeyDown(event, inputId, index) {
    if (event.key === 'Backspace' && !event.target.value) {
      setRows((prevRows) => {
        const updatedRows = [...prevRows];
        updatedRows[activeRow] = {
          ...updatedRows[activeRow],
          [inputId]: '',
        };
        return updatedRows;
      });
  
      // Focus on the previous input when the backspace key is pressed
      if (index > 0) {
        inputRefs.current[index - 1].current.focus();
      }     
    } else if (event.key === 'Enter') {
      compareInputWithWord(index);
    }
  }

  function checkWord(value, index) {
    const letters = word.split('');
    const letter = value.toLowerCase();
  
    if (letters[index] === letter) {
      document.getElementsByClassName('row')[activeRow].childNodes[index].classList.add('green');
    } else if (letters.includes(letter)) {
      document.getElementsByClassName('row')[activeRow].childNodes[index].classList.add('yellow');
    } else {
      document.getElementsByClassName('row')[activeRow].childNodes[index].classList.add('grey');
    }
  }

  function compareInputWithWord(index) {
    const userInput = Object.values(rows[activeRow]);
    const isWordinTheList = words.words.includes(userInput.join(''));
  
    if (isWordinTheList && index === 4) {
      // Win condition function checks if the word contains all the letters from 'word' and if the indexes of the letters are the same
      const winCondition = userInput.length === word.length && userInput.every((letter) => word.includes(letter)) && word.split('').every((letter) => userInput.includes(letter));
      console.log(userInput);
      console.log(word.split(''));
      userInput.forEach(checkWord);
      if (winCondition) {
        setMsg('You won!');
        setGameEnded(true);
      } else {
        goToTheNextRow();
      }
    } else {
      setMsg('No such word was found!');
    }
  }

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].current.focus();
    }
  }, [activeRow, inputRefs]);

  useEffect(() => {
    const randomWord = words.words[Math.floor(Math.random() * words.words.length)];
    setWord(randomWord);
  }, []);

  return (
    <div className="Game">
      <div className="game-div">
        <div className="rows-div">
          {rows.map((row, rowIndex) => (
            <div className="row" key={rowIndex}>
              {Object.keys(row).map((inputId, index) => (
                <input
                  key={inputId}
                  ref={rowIndex === activeRow ? inputRefs.current[index] : null}
                  type="text"
                  maxLength="1"
                  value={row[inputId]}
                  onInput={(event) => handleInputChange(event, inputId, index)}
                  onKeyDown={(event) => {
                    if (event.key === 'Backspace' || event.key === 'Enter') {
                      handleKeyDown(event, inputId, index)
                    //include only letters (also polish) in the input
                    } else if (!event.key.match(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/)) {
                      event.preventDefault();
                    }}
                  }
                  disabled={gameEnded || rowIndex !== activeRow}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="msg-div">
          {msg}
        </div>
      </div>
    </div>
  );
}

export default Game;