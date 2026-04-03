import { useState } from 'react'
import './App.css'

function Button({ buttonText, onClick }) {
  //Antagligen state här också för att sätta onClick och göra olika saker baserat på
  //Om det är för navigering till annan sida
  //Eller för att starta spelet
  return (
    <button
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
}

function GameBoard() {
  //Måste nog även här ha state för att uppdatera UI, rätt ord, fel ord, misplaced
  //Alltså koppla till getFeedback

  return (
    <div
      className='gameboard'
    >
      {[...Array(6)]
        .map((_, rowIndex) => {
          return (
            <div
              key={rowIndex}
              className='row'
            >
              {[...Array(5)].map((_, cellIndex) => {
                return (
                  <div
                    key={cellIndex}
                    className='cell'
                  >
                    {rowIndex} - {cellIndex}
                  </div>
                );
              })}
            </div>
          );
        })}

    </div>

  );
}

function InputText({ text, value, onChange, onKeyDown }) {
  //Måste kolla state så vi kan koppla till chooseWordFunktion
  //Måste eventuellt ha ett till state för namn till highscores
  //Och eventuellt ett till för gissning som ska kopplas till getFeedback func
  //Måste också skicka gissning till en array eller kanske till vår färdiga array i getFeedback?

  console.log(value);

  return (
    <>
      <input
        type="text"
        placeholder={text}
        size="50"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </>
  );
}

function CheckBox() {
  const [isChecked, setIsChecked] = useState(false);
  console.log(isChecked);
  //Måste kolla state så att vi kan uppdatera chooseWord funktion
  //Alltså skicka true/false
  return (
    <>
      <p>Allow double letters?</p>
      <input
        type='checkbox'
        name='yes'
        id="checkBoxOne"
        onChange={(event) => setIsChecked(event.target.checked)}
        checked={isChecked}
      />

      <label htmlFor="checkBoxOne">
        yes
      </label>
    </>
  );

}

function App() {
  const [wordLength, setWordLength] = useState("");
  const [guess, setGuess] = useState("");
  const [guessedWords, setGuessedWords] = useState([]);

  function handleSubmitGuess() {

    if (!guess.trim()) return;

    setGuessedWords([...guessedWords,
    {
      guess: guess,
      id: crypto.randomUUID()
    }
    ]);
    setGuess("");
  }

  function onKeyDown(event) {
    if (event.key === "Enter") {
      handleSubmitGuess();
    } else if (event.key === "Escape") {
      setGuess("");
    };
  };

  console.log(guessedWords)

  return (
    <div
      className='app'
    >
      <div className=
        'nav__buttons'
      >
        <Button
          buttonText="Highscores"
        />

        <Button
          buttonText="About us"
        />
      </div>

      <h1>Guess the word!</h1>

      <GameBoard />

      <div className='input__rules'>
        <InputText
          text="Enter desired word length"
          value={wordLength}
          onChange={(e) => setWordLength(e.target.value)}
        />

        <CheckBox />
      </div>

      <Button
        buttonText="Start"
      />

      <div>
        <InputText
          text="Enter your guess here"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          onKeyDown={onKeyDown}
        />

        <Button
          buttonText="Submit"
          onClick={handleSubmitGuess}
        />
      </div>
    </div>

  );

}

export default App
