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

function GameBoard({ guessedWords, wordLength, guess }) {
  //Måste nog även här ha state för att uppdatera UI, rätt ord, fel ord, misplaced
  //Alltså koppla till getFeedback
  const numberOfLetters = Number(wordLength) || 5;


  return (
    <div
      className='gameboard'
    >
      {[...Array(6)]
        .map((_, rowIndex) => {
          const isActive = rowIndex === guessedWords.length;
          const isLocked = rowIndex < guessedWords.length;
          const isFuture = rowIndex > guessedWords.length;
          const guessedWord = guessedWords[rowIndex];
          const word = isActive ? (guess || "") : (guessedWord?.guess || "");
          const letters = word.toUpperCase().split("");


          return (
            <div
              key={rowIndex}
              className={`row 
              ${isActive ? 'active--row' : ''}
              ${isLocked ? 'locked--row' : ''}
              ${isFuture ? 'future--row' : ''} 
              `}
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

function HighscoreForm({
  label,
  buttonText,
  buttonText2,
  className,
  classNameButton,
  playerName,
  onSubmit,
  onChange,
  onPlayAgain
}) {
  return (
    <>
      <p>Congratulations, you won!</p>

      <div className='highscoreForm'>
        <InputText
          label={label}
          className={className}
          value={playerName}
          onChange={onChange}
        />
        <Button
          buttonText={buttonText}
          onClick={onSubmit}
        />
      </div>
      <Button
        buttonText={buttonText2}
        className={classNameButton}
        onClick={onPlayAgain}
      />
    </>
  );
}

function App() {
  const [wordLength, setWordLength] = useState("");
  const [guess, setGuess] = useState("");
  const [guessedWords, setGuessedWords] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameIsFinished, setGameIsFinished] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [playerStats, setPlayerStats] = useState([]);

  const randomWord = "Alger";

  function handleSubmitGuess() {

    const maxLength = Number(wordLength) || 5;

    if (gameIsFinished) return;

    if (!guess.trim()) return;

    if (guess.length !== maxLength) return;

    setGuessedWords([...guessedWords,
    {
      guess: guess,
      id: crypto.randomUUID()
    }
    ]);
    setGuess("");

    const nextGuessCount = guessedWords.length + 1;

    if (guess.toLowerCase() === randomWord.toLowerCase()) {
      setGameWon(true)
      setGameIsFinished(true);
    }

    else if (nextGuessCount >= 6) {
      setGameIsFinished(true);
    }
  }

  function onKeyDown(event) {
    if (event.key === "Enter") {
      handleSubmitGuess();
    } else if (event.key === "Escape") {
      setGuess("");
    };
  };

  function handleStartGame() {
    setGameStarted(true);
  }

  function validateWordLength(e) {
    const value = e.target.value;
    const maxLength = Number(wordLength) || 5;

    if (value.length <= maxLength) {
      setGuess(value);
    }
  }

  function handlePlayerName(e) {
    setPlayerName(e.target.value);
  }

  function handleSubmitStats() {
    setPlayerStats([...playerStats,
    {
      name: playerName,
      guesses: guessedWords.length
    }
    ])
  }

  console.log(playerStats)


  console.log(guessedWords)

  function gameReset() {
      setGameWon(false);
      setGameIsFinished(false);
      setGameStarted(false);
      setGuessedWords([]);
      setGuess("");
      setPlayerName("");
    
  }

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
        guess={guess}
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
            className="Play__button"
            buttonText="Start"
            onClick={handleStartGame}
          />
        </>
      )}

      {gameStarted && !gameIsFinished && (
        <div className='input__guess'>
          <InputText
            className="input__general"
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

      {gameWon && gameIsFinished && (
        <HighscoreForm
          label="Name"
          buttonText="Submit"
          buttonText2="Again"
          className="input__general"
          classNameButton="play__button"
          playerName={playerName}
          onChange={handlePlayerName}

          onSubmit={handleSubmitStats}
          onPlayAgain = {gameReset}
        />
      )}

      {!gameWon && gameIsFinished && (
        <>
          <p>You failed to guess the correct word</p>
          <Button
            buttonText="Try again"
            onClick={gameReset}
          />
        </>
      )}

    </div>

  );

}

export default App
