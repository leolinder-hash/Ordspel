import express from "express";
import Highscore from "../models/Highscore.js"

const pagesRouter = express.Router();

pagesRouter.get('/about', (req, res) => {
  res.render("about");
})

//Fetch highscored from DB, sorting them by time and adding ranking for SSR page
pagesRouter.get('/highscores', async (req, res) => {

  const scores = await Highscore.find().sort({ time: 1 }).lean();

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