import '../App.scss';
import { useState, useEffect, useRef, createRef } from 'react';
import Confetti from "react-confetti";
import React from 'react';
import axios from 'axios';

function Game() {

  const [activeRow, setActiveRow] = useState(0);
  const [msg, setMsg] = useState('');
  const [words, setWords] = useState([]);
  const [randomWord, setRandomWord] = useState('');
  const [gameEnded, setGameEnded] = useState(false);
  const [lastTarget, setLastTarget] = useState(0);

  const [rows, setRows] = useState(Array(6).fill(0).map(() => ({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    input5: '',
  })));

  const inputRefs = useRef(Array(5).fill(0).map(() => createRef()));

  function goToTheNextRow() {
    if (activeRow < rows.length - 1) {
      setActiveRow((prevActiveRow) => prevActiveRow + 1);
      setLastTarget(0);
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
      setLastTarget(index + 1);
    }  
  }  

  function handleKeyDown(event, inputId, index) {
    if (event.key === 'Backspace') {
      setMsg("");
    }
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
        setLastTarget(index - 1);
      }     
    } else if (event.key === 'Enter') {
      compareInputWithWord(index);
    }
  }

  function changeLettersColors(value, index) {
    const letters = randomWord.split('');
    const letter = value.toLowerCase();
  
    if (letters[index] === letter) {
      document.getElementsByClassName('row')[activeRow].childNodes[index].classList.add('green');
    } else if (letters.includes(letter)) {
      document.getElementsByClassName('row')[activeRow].childNodes[index].classList.add('yellow');
    } else {
      document.getElementsByClassName('row')[activeRow].childNodes[index].classList.add('grey');
    }
  }

  function checkWordMatch(userInput, word) {
    for (let i = 0; i < word.length; i++) {
      if (userInput[i] !== word[i]) {
        return false;
      }
    }
    return true;
  }

  function setConfetti() {
    document.getElementsByClassName('confetti')[0].classList.add('confetti-visible');
    setTimeout(() => {
      document.getElementsByClassName('confetti')[0].classList.remove('confetti-visible');
    }, 2500);
  }

  function compareInputWithWord(index) {
    const userInput = Object.values(rows[activeRow]);
    const isWordinTheList = words.includes(userInput.join('')) ;
  
    if (isWordinTheList && index === 4) {
      // Win condition function checks if the word contains all the letters from 'word' and if the indexes of the letters are the same
      const winCondition = checkWordMatch(userInput, randomWord.split(''));
      userInput.forEach(changeLettersColors);
      if (winCondition) {
        setMsg('You won!');
        setConfetti();
        document.getElementsByClassName('msg-div')[0].classList.add('win');
        setGameEnded(true);
      } else {
        goToTheNextRow();
      }
    } else {
      setMsg('No such word was found!');
    }
  }

  const getAllWords = async () => {
    return axios.get(`http://localhost:5000/words`, {
        withCredentials: true
    })
    .then(res => {
        return res.data
    })
    .catch(err => console.log(err))
  };

  useEffect(() => {
    // Focus first input in the first row on page load
    if (inputRefs.current[0]) {
      inputRefs.current[0].current.focus();
    }
  }, [activeRow, inputRefs]);

  useEffect(() =>{
    getAllWords().then((response) => {
      const words = response.map((word) => word.word);
      const randomWord = words[Math.floor(Math.random() * response.length)];
      console.log("Word to guess: " + randomWord);
      setWords(words);
      setRandomWord(randomWord);
    });
  }, []);

  return (
    <div className="Game">
      <Confetti className="confetti" />
      <div className="game-div">
        <div className="rows-div">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
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
                      handleKeyDown(event, inputId, index);
                    //include only letters (also polish) in the input
                    } else if (!event.key.match(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/)) {
                      event.preventDefault();
                    }}
                  }
                  //focus on the last input when the user clicks elsewhere
                  onBlur={(e) => {
                    if (e.relatedTarget === null) {
                      inputRefs.current[lastTarget].current.focus();
                    }
                  }}
                  disabled={gameEnded || rowIndex !== activeRow}
                  //prevent the user from selecting input manually
                  onMouseDown={(e) => e.preventDefault()}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="msg-div">
          <p>{msg}</p>
        </div>
      </div>
    </div>
  );
}

export default Game;