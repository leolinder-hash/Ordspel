import express from "express";
import highScores from "../../data/highscoreList.js";

const pagesRouter = express.Router();

pagesRouter.get('/', (req, res) => {
  res.send("This is the start page")
})

pagesRouter.get('/about', (req, res) => {
  res.send("This is the about page")
})

pagesRouter.get('/highscores', (req, res) => {
  const sortedHighscores = [...highScores].sort((a, b) => {
    return a.time - b.time
  })
  
  res.render("highscores", {
    highscores: sortedHighscores
  });
})

export default pagesRouter;