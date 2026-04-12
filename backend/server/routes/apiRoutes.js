import express from "express";

const apiRouter = express.Router();

apiRouter.get('/words', (req, res) => {
  console.log("det fungerar!")
  res.json(["word1", "word2"]);
})

const activeSessions = new Map();

apiRouter.post('/game/start', (req, res) => {
  const { wordLength, allowDuplicateLetters } = req.body;
  const sessionId = crypto.randomUUID();
  const randomWord = "apple";

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

  const gameSession = {
    gameSessionId: sessionId,
    createdAt: new Date(),

    settings: {
      wordLength: wordLength,
      allowDuplicateLetters: allowDuplicateLetters ?? false,
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
    settings: gameSession.settings
  });
})

export default apiRouter;