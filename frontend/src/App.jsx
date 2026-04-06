import { useState } from 'react'
import './App.css'

function Button({ buttonText, onClick, className }) {
  //Antagligen state här också för att sätta onClick och göra olika saker baserat på
  //Om det är för navigering till annan sida
  //Eller för att starta spelet
  return (
    <button
      className={className}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
}

function GameBoard({ guessedWords, wordLength }) {
  //Måste nog även här ha state för att uppdatera UI, rätt ord, fel ord, misplaced
  //Alltså koppla till getFeedback
  const numberOfLetters = Number(wordLength) || 5;


  return (
    <div
      className='gameboard'
    >
      {[...Array(6)]
        .map((_, rowIndex) => {
          const guessedWord = guessedWords[rowIndex];
          const word = guessedWord?.guess || "";
          const letters = word.toUpperCase().split("");

          return (
            <div
              key={rowIndex}
              className='row'
            >
              {[...Array(numberOfLetters)].map((_, cellIndex) => {
                const letter = letters[cellIndex] || "";
                return (
                  <div
                    key={cellIndex}
                    className='cell'
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          );
        })
      }

    </div>

  );
}

function InputText(
  {
    text,
    value,
    onChange,
    onKeyDown,
    className,
    label,
  }) {
  //Måste kolla state så vi kan koppla till chooseWordFunktion
  //Måste eventuellt ha ett till state för namn till highscores
  //Och eventuellt ett till för gissning som ska kopplas till getFeedback func
  //Måste också skicka gissning till en array eller kanske till vår färdiga array i getFeedback?

  console.log(value);

  return (
    <div className='input'>
      {label && <label>{label}</label>}
      <input
        type="text"
        placeholder={text}
        size="50"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className={className}
      />
    </div>
  );
}

function CheckBox() {
  const [isChecked, setIsChecked] = useState(false);
  console.log(isChecked);
  //Måste kolla state så att vi kan uppdatera chooseWord funktion
  //Alltså skicka true/false
  return (
    <div
      className='checkbox__input'
    >
      <p>Double letters?</p>
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
    </div>
  );

}

function App() {
  const [wordLength, setWordLength] = useState("");
  const [guess, setGuess] = useState("");
  const [guessedWords, setGuessedWords] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  function handleSubmitGuess() {

    const maxLength = Number(wordLength) || 5;

    if (guessedWords >= 6) return;

    if (!guess.trim()) return;

    if (guess.length !== maxLength) return;

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

  function handleStartGame() {
    setGameStarted(true)
  }

  function validateWordLength(e) {
    const value = e.target.value;
    const maxLength = Number(wordLength) || 5;

    if (value.length <= maxLength) {
      setGuess(value);
    }
  }

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

      <GameBoard
        guessedWords={guessedWords}
        wordLength={wordLength}
      />

      {!gameStarted && (
        <>
          <div className='input__rules'>
            <InputText
              label="Desired word length:"
              className="letter__length"
              value={wordLength}
              onChange={(e) => setWordLength(e.target.value)}
            />
          </div>

          <CheckBox />

          <Button
            className="start__button"
            buttonText="Start"
            onClick={handleStartGame}
          />
        </>
      )}

      {gameStarted && (
        <div className='input__guess'>
          <InputText
            text="Enter your guess here"
            value={guess}
            onChange={validateWordLength}
            onKeyDown={onKeyDown}
          />

          <Button
            buttonText="Submit"
            onClick={handleSubmitGuess}
          />
        </div>
      )}

    </div>

  );

}

export default App
