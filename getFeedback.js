

export function getFeedback(guessWord, correctWord) {
  //Kontrollera vilka bokstäver från det ena ordet som förekommer i det andra och i så fall var
  const guessLetters = guessWord.toLowerCase().split(''); //Alla bokstäver i de gissade ordet
  const correctLetters = correctWord.toLowerCase().split(''); //Alla bokstäver i det korrekta ordet
  const result = []; //Ska lagra objekt med bokstäver samt om de är korrekta

  //Steg 1: Börjar med en for-loop som utgår från att hitta bokstäver som garanterat är korrekt.
  //Stryker också dessa från correctLetters så att vi inte råkar använda dem igen i nästa loop
  for (let i = 0; i < guessLetters.length; i++) {
    if (correctLetters[i] === guessLetters[i]) {

      correctLetters[i] = null; //Stryk de korrekta bokstäverna från array

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

  //I nedanstående loop vill vi ta reda på om bokstaven finns i det andra ordet men på fel plats, eller inte alls
  for (let i = 0; i < guessLetters.length; i++) {
    if (result[i].result === "correct") {
      continue;
    }
    result[i].result = checkLetter(guessLetters[i], correctLetters);
  }
  return result;
}

//Tar gissad bokstav och undersöker om det förekommer bland de korrekta bokstäverna
//Om ja --> returnerar misplaced
//Om nej --> returnerar incorrect

function checkLetter(letter, correctLetters) {
  const foundIndex = correctLetters.indexOf(letter);

  if (foundIndex !== -1) {
    correctLetters[foundIndex] = null;
    return "misplaced";
  } else {
    return "incorrect";
  }
}

console.log(getFeedback("HALLÅ", "CYKLA"));


