import express from "express";
import pagesRouter from "./routes/pages.js";

const app = express();
const port = 5080;

app.use('/', pagesRouter);

app.listen(port, ()=> {
  console.log(`server is running on ${port}`)
})