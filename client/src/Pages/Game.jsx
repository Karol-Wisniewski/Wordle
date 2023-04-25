import '../App.scss';
import { useState, useEffect, useRef, createRef } from 'react';
import Confetti from "react-confetti";
import React from 'react';
import axios from 'axios';
import VirtualKeyboard from '../Components/VirtualKeyboard';

function Game() {

  const letters = "AĄBCĆDEĆFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŹŻ";

  const [activeRow, setActiveRow] = useState(0);
  const [msg, setMsg] = useState('');
  const [words, setWords] = useState([]);
  const [randomWord, setRandomWord] = useState('');
  const [gameEnded, setGameEnded] = useState(false);
  const [lastTarget, setLastTarget] = useState(0);
  const [usedLetters, setUsedLetters] = useState(
    letters.split("").reduce((acc, letter) => {
      acc[letter] = "";
      return acc;
    }, {})
  );

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

  function handleKeyPress(key) {
    const currentInputIdEnter = `input${lastTarget + 1}`;
    const currentInputIdBackspace = `input${lastTarget}`;
    if ((key === 'Backspace' && lastTarget === 4 && inputRefs.current[lastTarget].current.value !== '')) {
      handleKeyDownFromKeyboardLast(key, currentInputIdEnter, lastTarget);
    } else if (key === 'Backspace') {
      handleKeyDownFromKeyboard(key, currentInputIdBackspace, lastTarget);
    } else if (key === 'Enter') {
      handleKeyDownFromKeyboard(key, currentInputIdEnter, lastTarget);
    } else if (letters.includes(key.toUpperCase())) {
      handleInputChangeFromKeyboard(key, currentInputIdEnter, lastTarget);
    }
  }

  function handleInputChangeFromKeyboard(key, inputId, index) {

    if (!inputRefs.current[index].current.value) {
      setRows((prevRows) => {
        const updatedRows = [...prevRows];
        updatedRows[activeRow] = {
          ...updatedRows[activeRow],
          [inputId]: key.toUpperCase(),
        };
        return updatedRows;
      });
    }
  
    // Focus on the next input when a letter is entered
    if (index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].current.focus();
      setLastTarget(index + 1);
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

  function handleKeyDownFromKeyboard(key, inputId, index) {
    if (key === 'Backspace') {
      setMsg("");

      const condition = index === 0 && inputRefs.current[index].current.value === ''

      if (!condition) {
        setRows((prevRows) => {
          const updatedRows = [...prevRows];
          updatedRows[activeRow] = {
            ...updatedRows[activeRow],
            [inputId]: '',
          };
          return updatedRows;
        });
      } else {
        inputRefs.current[index].current.focus();
      }

      // Focus on the previous input when the backspace key is pressed
      if (index > 0) {
        inputRefs.current[index - 1].current.focus();
        setLastTarget(index - 1);
      } 
    } else if (key === 'Enter') {
      compareInputWithWord(index);
    }
  }

  function handleKeyDownFromKeyboardLast(key, inputId, index) {
    if (key === 'Backspace') {
      setMsg("");
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
    } else if (key === 'Enter') {
      compareInputWithWord(index);
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
    const letters = randomWord.toUpperCase().split('');
    const letter = value.toUpperCase();
  
    if (letters[index] === letter) {
      document.getElementsByClassName('row')[activeRow].childNodes[index].classList.add('green')
      setUsedLetters((prevUsedLetters) => ({
        ...prevUsedLetters,
        [letter]: "green",
      }));
    } else if (letters.includes(letter)) {
      document.getElementsByClassName('row')[activeRow].childNodes[index].classList.add('yellow');
      setUsedLetters((prevUsedLetters) => ({
        ...prevUsedLetters,
        [letter]: "yellow",
      }));
    } else {
      document.getElementsByClassName('row')[activeRow].childNodes[index].classList.add('grey');
      setUsedLetters((prevUsedLetters) => ({
        ...prevUsedLetters,
        [letter]: "grey",
      }));
    }
  }  

  function checkWordMatch(userInput, word) {
    for (let i = 0; i < word.length; i++) {
      if (userInput[i].toLowerCase() !== word[i].toLowerCase()) {
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
    console.log(userInput);
    const isWordinTheList = words.includes(userInput.join('').toLowerCase());
  
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
                  onInput={(e) => {
                      handleInputChange(e, inputId, index)
                      //add class for 0.5 sec to animate the input (dont do it if user deletes the letter)
                      if (e.target.value) {
                        e.target.classList.add('input-clicked');
                        setTimeout(() => {
                          e.target.classList.remove('input-clicked');
                        }, 200);
                      }
                    }
                  }
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
        <VirtualKeyboard
          onKeyPress={handleKeyPress}
          usedLetters={usedLetters}
        />
      </div>
    </div>
  );
}

export default Game;