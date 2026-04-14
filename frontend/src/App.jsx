import { useState } from 'react'
import { Button } from './components/Button';
import { GameBoard } from './components/GameBoard';
import { InputText } from './components/InputText';
import { CheckBox } from './components/CheckBox';
import { HighscoreForm } from './components/HighscoreForm';
import './App.css'



function App() {
  const [wordLength, setWordLength] = useState("5");
  const [isChecked, setIsChecked] = useState(false);
  const [guess, setGuess] = useState("");
  const [guessedWords, setGuessedWords] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameIsFinished, setGameIsFinished] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [playerStats, setPlayerStats] = useState([]);
  const [sessionId, setSessionId] = useState(null);


  async function handleSubmitGuess() {

    const maxLength = Number(wordLength) || 5;

    if (gameIsFinished) return;

    if (!guess.trim()) return;

    if (guess.length !== maxLength) return;

    const nextGuessCount = guessedWords.length + 1;
    const currentGuess = guess;

    const response = await fetch("api/game/guess", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sessionId: sessionId,
        guess: currentGuess
      })
    })

    const data = await response.json();

    setGuessedWords([...guessedWords,
    {
      guess: currentGuess,
      letterFeedback: data.letterFeedback,
      id: crypto.randomUUID()
    }
    ]);

    setGuess("");

    if (data.gameStatus === "won") {
      setGameWon(true)
      setGameIsFinished(true);
    }

    else if (data.gameStatus === "lost") {
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

  async function handleStartGame() {
    setGameStarted(true);

    const response = await fetch("api/game/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        wordLength: Number(wordLength),
        allowDuplicateLetters: isChecked
      })
    })

    const data = await response.json();

    setSessionId(data.sessionId)
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
