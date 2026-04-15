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
  res.render("highscores", {
    highscores: highScores
  });
})

export default pagesRouter;