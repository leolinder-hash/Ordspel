import express from "express";
import pagesRouter from "./routes/pages.js";
import apiRouter from "./routes/apiRoutes.js"

const app = express();
const port = 5080;

app.use('/', pagesRouter);
app.use('/api', apiRouter);

app.listen(port, ()=> {
  console.log(`server is running on ${port}`)
})