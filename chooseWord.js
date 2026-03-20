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

function chooseWord(words, length, sameLetters) {

  const approvedWords = words.filter(word => {

    if (word.length !== length) { //Stämmer längd?
      return false;
    }

    if (!sameLetters) { //Om bokstäver inte får förekomma mer än en gång
      return hasUniqueletters(word);
    }

    return true;
  });

  if (approvedWords.length === 0){ //Om inga ord finns i listan --> meddelande
    return null;
  }

  const index = Math.floor(Math.random() * approvedWords.length);
  return approvedWords[index];
}

const words = ["Ponny", "Motorcross", "Husvagn", "Brödet", "Sjukhus", "Matta"];
const length = 7;
const sameLetters = false;

console.log(chooseWord(words, length, sameLetters));


function hasUniqueletters(word) {
  let letters = word.split(""); //Lista med bokstäver
  let uniqueLetters = new Set(letters); //Lista med bokstäver som är unika

  return word.length === uniqueLetters.size;
};


