/* Feedback-function for correct/incorrect/misplaced letters */

export function getFeedback(guessWord, correctWord) {
  const guessLetters = guessWord.toLowerCase().split(''); 
  const correctLetters = correctWord.toLowerCase().split(''); 
  const result = []; 

  for (let i = 0; i < guessLetters.length; i++) {
    if (correctLetters[i] === guessLetters[i]) {

      correctLetters[i] = null; 

      result[i] = {
        letter: guessLetters[i],
        result: "correct"
      }
    } else {
      result[i] = {
        letter: guessLetters[i],
        result: null
      }
    }
  }

  for (let i = 0; i < guessLetters.length; i++) {
    if (result[i].result === "correct") {
      continue;
    }
    result[i].result = checkLetter(guessLetters[i], correctLetters);
  }
  return result;
}

export function checkLetter(letter, correctLetters) {
  const foundIndex = correctLetters.indexOf(letter);

  if (foundIndex !== -1) {
    correctLetters[foundIndex] = null;
    return "misplaced";
  } else {
    return "incorrect";
  }
}

