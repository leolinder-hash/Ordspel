import mongoose, { Schema } from "mongoose";

const highscoreSchema = new Schema({
  playerName: String,
  numberOfGuesses: Number,
  time: Number,
  date: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model("Highscore", highscoreSchema)