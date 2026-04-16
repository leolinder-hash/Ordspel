import express from "express";
import { engine } from "express-handlebars";
import pagesRouter from "./routes/pages.js";
import apiRouter from "./routes/apiRoutes.js"
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5080;

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());

app.use('/', pagesRouter);
app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`server is running on ${port}`)
})