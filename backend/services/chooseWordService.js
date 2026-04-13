/* Algoritm B – val av ord (frivillig, krävs ej för godkänt)
Denna funktion är spelets sätt att välja ut ett ord att spela med. Den ska uppfylla följande kriterier:

Inputs:
En lista med ord
En siffra som anger önskad längd
En indikation på huruvida samma bokstav får förekomma mer än en gång i ordet, eller om alla bokstäver måste vara unika

Funktionalitet:
Välj slumpmässigt ut ett ord ur listan som uppfyller kriterierna i de övriga parametrarna
Hantera på något väldefinierat sätt situationen som uppstår när inget passande ord finns
Output: Det slumpmässigt utvalda ordet */

export function chooseWord(words, wordLength, allowDuplicates) {

  const validWords = words.filter(word => {

    if (word.length !== wordLength) { //Stämmer längd?
      return false;
    }

    if (!allowDuplicates) { //Om bokstäver inte får förekomma mer än en gång
      return hasUniqueLetters(word);
    }

    return true;
  });

  if (validWords.length === 0){ //Om inga ord finns i listan --> null
    return null;
  }

  const index = Math.floor(Math.random() * validWords.length);
  return validWords[index];
}

export function hasUniqueLetters(word) {
  const letters = word.toLowerCase().split(""); //Lista med bokstäver
  const uniqueLetters = new Set(letters); //Lista med bokstäver som är unika

  return letters.length === uniqueLetters.size;
};

/* const words = ["Ponny", "Motorcross", "Husvagn", "Brödet", "Sjukhus", "Matta"];
const length = 7;
const allowDuplicates = false;

console.log(chooseWord(words, length, allowDuplicates)); */

