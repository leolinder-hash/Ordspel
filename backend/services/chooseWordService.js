/* Function for choosing a random word for the game */

export function chooseWord(words, wordLength, allowDuplicates) {

  const validWords = words.filter(word => {

    if (word.length !== wordLength) {
      return false;
    }

    if (!allowDuplicates) {
      return hasUniqueLetters(word);
    }

    return true;
  });

  if (validWords.length === 0) {
    return null;
  }

  const index = Math.floor(Math.random() * validWords.length);
  return validWords[index];
}

export function hasUniqueLetters(word) {
  const letters = word.toLowerCase().split("");
  const uniqueLetters = new Set(letters);

  return letters.length === uniqueLetters.size;
};

