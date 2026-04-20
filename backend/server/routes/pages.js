import express from "express";
import Highscore from "../models/Highscore.js"
import { settings } from "cluster";

const pagesRouter = express.Router();

pagesRouter.get('/about', (req, res) => {
  res.render("about");
})

//Fetch highscored from DB, sorting them by time and adding ranking for SSR page
pagesRouter.get('/highscores', async (req, res) => {
  const {wordLength, allowDuplicateLetters} = req.query;

  const parsedWordLength = Number(wordLength);
  const parsedAllowDuplicates = allowDuplicateLetters === "true";

  const filter = {};

  if (wordLength){
    filter["settings.wordLength"] = parsedWordLength;
  }

  if (allowDuplicateLetters !== undefined){
    filter["settings.allowDuplicateLetters"] = parsedAllowDuplicates;
  }

  console.log(filter);

  const scores = await Highscore.find(filter).sort({ time: 1 }).lean();

  const highscores = scores.map((score, index) => {
    return {
      ...score,
      rank: index + 1,
      time: score.time.toFixed(2)
    }
  })

  res.render("highscores", {
    highscores: highscores
  });
})

export default pagesRouter;