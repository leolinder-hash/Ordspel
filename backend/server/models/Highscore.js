import mongoose, { Schema } from "mongoose";

const highscoreSchema = new Schema({
  sessionId: String,
  playerName: String,
  guesses: Array,
  numberOfGuesses: Number,
  time: Number,
  settings: Object,
  date: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model("Highscore", highscoreSchema)