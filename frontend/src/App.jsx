import { useState } from 'react'
import { Button } from './components/Button';
import { GameBoard } from './components/GameBoard';
import { InputText } from './components/InputText';
import { CheckBox } from './components/CheckBox';
import { HighscoreForm } from './components/HighscoreForm';
import './App.css'



function App() {
  const [wordLength, setWordLength] = useState("");
  const [isChecked, setIsChecked] = useState(false);
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

          <CheckBox
            isChecked={isChecked}
            setIsChecked={setIsChecked}
          />

          <Button
            className="play__button"
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
          onPlayAgain={gameReset}
        />
      )}

      {!gameWon && gameIsFinished && (
        <div className='game__lost'>
          <p>You failed to guess the correct word</p>
          <Button
            buttonText="Try again"
            onClick={gameReset}
            className="play__button"
          />
        </div>
      )}

    </div>

  );

}

export default App
