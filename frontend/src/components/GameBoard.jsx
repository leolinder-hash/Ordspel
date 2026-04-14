import './GameBoard.css'

export function GameBoard({ guessedWords, wordLength, guess }) {
  //Måste nog även här ha state för att uppdatera UI, rätt ord, fel ord, misplaced
  //Alltså koppla till getFeedback
  const numberOfLetters = Number(wordLength) || 5;


  return (
    <div
      className='gameboard'
    >
      {[...Array(6)]
        .map((_, rowIndex) => {
          const isActive = rowIndex === guessedWords.length;
          const isLocked = rowIndex < guessedWords.length;
          const isFuture = rowIndex > guessedWords.length;
          const guessedWord = guessedWords[rowIndex];
          const rowFeedback = guessedWord?.letterFeedback || [];
          const word = isActive ? (guess || "") : (guessedWord?.guess || "");
          const letters = word.toUpperCase().split("");


          return (
            <div
              key={rowIndex}
              className={`row 
              ${isActive ? 'active--row' : ''}
              ${isLocked ? 'locked--row' : ''}
              ${isFuture ? 'future--row' : ''} 
              `}
            >
              {[...Array(numberOfLetters)].map((_, cellIndex) => {
                const letter = letters[cellIndex] || "";
                const feedBackItem = rowFeedback[cellIndex];
                const result = feedBackItem?.result;

                const isCorrect = result === "correct";
                const isMisplaced = result === "misplaced";
                const isIncorrect = result === "incorrect";

                return (
                  <div
                    key={cellIndex}
                    className={`cell
                    ${isLocked && isCorrect ? "correct--cell" : ""} 
                    ${isLocked && isIncorrect ? "incorrect--cell" : ""} 
                    ${isLocked && isMisplaced ? "misplaced--cell" : ""}
                    `}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          );
        })
      }

    </div>

  );
}