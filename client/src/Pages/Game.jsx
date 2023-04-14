import '../App.scss';
import { useState, useEffect, useRef } from 'react';
import React from 'react';
import words from '../Components/Words.js';

function Game() {

  const [activeRow, setActiveRow] = useState(0);

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
      console.log('Game over!');
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

  function compareInputWithWord(index) {
    const userInput = Object.values(rows[activeRow]).join('');
    const isWordinTheList = words.words.includes(userInput);
  
    if (isWordinTheList && index === 4) {
      console.log('The word is in the list!');
      goToTheNextRow();
    } else {
      console.log('No such word was found!');
    }
  }

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].current.focus();
    }
  }, [activeRow]);

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
                  onKeyDown={(event) => handleKeyDown(event, inputId, index)}
                  disabled={rowIndex !== activeRow}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Game;
