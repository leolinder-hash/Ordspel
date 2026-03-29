import express from "express";

const app = express();
const port = 5080;

app.get('/', (req, res) => {
  res.send("What is up?");
});

app.listen(port, ()=> {
  console.log(`server is running on ${port}`)
})