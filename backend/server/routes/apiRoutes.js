import express from "express";
import { getFeedback } from "../../services/getFeedbackService.js";
import { chooseWord } from "../../services/chooseWordService.js";
import words from "../../services/wordService.js";
import Highscore from "../models/Highscore.js"

const apiRouter = express.Router();

const activeSessions = new Map();

apiRouter.post('/game/start', (req, res) => {
  const { wordLength, allowDuplicateLetters } = req.body;
  const allowDuplicates = allowDuplicateLetters ?? false;
  const sessionId = crypto.randomUUID();

  if (typeof wordLength !== "number") {
    res.status(400).json({
      message: "Bad request, length must be a number"
    })

    return;
  }

  if (wordLength > 10) {
    res.status(400).json({
      message: "Bad request, try a shorter word"
    })

    return;
  }

  if (wordLength <= 0) {
    res.status(400).json({
      message: "Wordlength can't be less than zero"
    })

    return;
  }

  const randomWord = chooseWord(words, wordLength, allowDuplicates);

  if (!randomWord) {
    res.status(400).json({
      message: "Bad request, can't find matching word"
    })

    return;
  }

  const gameSession = {
    gameSessionId: sessionId,
    createdAt: new Date(),

    settings: {
      wordLength: wordLength,
      allowDuplicateLetters: allowDuplicates
    },

    correctWord: randomWord,
    startedAt: new Date(),
    endedAt: null,

    status: "active",

    guesses: [],

    resultSubmitted: false
  };

  activeSessions.set(sessionId, gameSession);

  res.json({
    sessionId: gameSession.gameSessionId,
    status: gameSession.status,
    settings: gameSession.settings,
    correctWord: gameSession.correctWord
  });
})

apiRouter.post('/game/guess', (req, res) => {
  const { sessionId, guess } = req.body;
  const gameSession = activeSessions.get(sessionId);

  if (!gameSession) {
    res.status(404).json({
      message: "Can't find specified game session"
    })

    return;
  }

  if (gameSession.status !== "active") {
    res.status(400).json({
      message: "Game session is not active!"
    })

    return;
  }

  if (typeof guess !== "string") {
    res.status(400).json({
      message: "Guess must be a string"
    })

    return;
  }

  if (guess.length !== gameSession.settings.wordLength) {
    res.status(400).json({
      message: "Length needs to match specified word-length"
    })

    return;
  }

  const result = getFeedback(guess, gameSession.correctWord);
  gameSession.guesses.push({
    guess,
    result
  });

  const isWin = result.every(letter => letter.result === "correct")

  if (isWin) {
    gameSession.status = "won";
    gameSession.endedAt = new Date();
  } else if (gameSession.guesses.length >= 6) {
    gameSession.status = "lost";
    gameSession.endedAt = new Date();
  }

  res.json({
    gameStatus: gameSession.status,
    letterFeedback: result,
    guesses: gameSession.guesses.length
  })
})

apiRouter.post('/highscores', async (req, res) => {
  const { playerName, sessionId } = req.body;
  const gameSession = activeSessions.get(sessionId);

  if (!gameSession) {
    res.status(404).json({
      message: "Can't find specified game session"
    })

    return;
  }

  if (gameSession.status !== "won") {
    res.status(400).json({
      message: "Game has not been won"
    })

    return;
  }

  if (gameSession.resultSubmitted === true) {
    res.status(409).json({
      message: "result has already been submitted"
    })

    return;
  }

  const highscore = {
    sessionId: gameSession.gameSessionId,
    playerName: playerName,
    guesses: gameSession.guesses,
    numberOfGuesses: gameSession.guesses.length,
    time: (gameSession.endedAt - gameSession.startedAt) / 1000,
    settings: gameSession.settings,
    date: new Date(),
  }

  await Highscore.create(highscore);

  gameSession.resultSubmitted = true;

  res.status(201).json({
    message: "Highscore was saved",
    highscore: highscore
  })
})

export default apiRouter;