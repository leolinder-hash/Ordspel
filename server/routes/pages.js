import express from "express";

const pagesRouter = express.Router();

pagesRouter.get('/', (req, res) => {
  res.send("This is the start page")
})

pagesRouter.get('/about', (req, res) => {
  res.send("This is the about page")
})

pagesRouter.get('/highscores', (req, res) => {
  res.send("This is the highscore page");
})

export default pagesRouter;