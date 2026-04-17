import express from "express";
import Highscore from "../models/Highscore.js"

const pagesRouter = express.Router();

pagesRouter.get('/', (req, res) => {
  res.send("This is the start page")
})

pagesRouter.get('/about', (req, res) => {
  res.send("This is the about page")
})

pagesRouter.get('/highscores', async (req, res) => {

  const scores = await Highscore.find().sort({ time: 1 }).lean();

  console.log("scores from db", scores);

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