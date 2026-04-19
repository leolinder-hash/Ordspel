import express from "express";
import { engine } from "express-handlebars";
import pagesRouter from "./routes/pages.js";
import apiRouter from "./routes/apiRoutes.js"
import connectDB from "./db.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Path to the built React app
const frontendDistPath = path.join(__dirname, "../../frontend/dist");

const app = express();
const port = 5080;

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

//Connect to mongoDB before initializing server
await connectDB();

app.use(express.json());

//Serve React frontend from localhost:5080
app.use(express.static(frontendDistPath));

//Serve shared CSS for hbs pages
app.use(express.static("public"));

app.use('/', pagesRouter);
app.use('/api', apiRouter);


app.listen(port, () => {
  console.log(`server is running on ${port}`)
})