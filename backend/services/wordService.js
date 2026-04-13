import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../data/words.txt");
const data = fs.readFileSync(filePath, "utf-8");

const words = data.split('\n').
map(word=> word.trim());

export default words;
