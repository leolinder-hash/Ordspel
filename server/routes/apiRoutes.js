import express from "express";

const apiRouter = express.Router();

apiRouter.get('/words', (req, res) => {
  console.log("det fungerar!")
  res.json(["word1", "word2"]);
})

export default apiRouter;