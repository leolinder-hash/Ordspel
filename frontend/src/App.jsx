import { useState } from 'react'
import './App.css'

function Button({ buttonText }) {
  //Antagligen state här också för att sätta onClick och göra olika saker baserat på
  //Om det är för navigering till annan sida
  //Eller för att starta spelet
  return (
    <button
    >{buttonText}
    </button>
  );
}

function GameBoard() {
  //Måste nog även här ha state för att uppdatera UI, rätt ord, fel ord, misplaced
  //Alltså koppla till getFeedback
  return (
    <div>
      <p>Here we will insert gameboard</p>
    </div>
  );
}

function InputText({ text }) {
  //Måste kolla state så vi kan koppla till chooseWordFunktion
  //Måste eventuellt ha ett till state för namn till highscores
  //Och eventuellt ett till för gissning som ska kopplas till getFeedback func
  //Måste också skicka gissning till en array eller kanske till vår färdiga array i getFeedback?

  return (
    <>
      <input
        type="text"
        placeholder={text}
        size="50" />
    </>
  );
}

function CheckBox() {
  const [isChecked, setIsChecked] = useState(false);
  console.log(isChecked);
  //Måste kolla state så att vi kan uppdatera chooseWord funktion
  //Alltså skicka true/false
  return (
    <>
      <p>Allow double letters?</p>
      <input
        type='checkbox'
        name='yes'
        id="checkBoxOne"
        onChange={(event) => setIsChecked(event.target.checked)}
        checked={isChecked}
      />

      <label htmlFor="checkBoxOne">
        yes
      </label>
    </>
  );

}

function App() {
  return (
    <>
      <Button
        buttonText="Highscores"
      />

      <Button
        buttonText="About us"
      />

      <h1>Guess the word!</h1>

      <GameBoard />

      <InputText
        text="Enter desired word length"
      />

      <CheckBox />

      <Button
        buttonText="Start"
      />

      <InputText
        text="Enter your guess here" />
      <Button
        buttonText="Submit"
      />
    </>

  );

}

export default App
