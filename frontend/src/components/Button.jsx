import './Button.css'

export function Button({ buttonText, onClick, className }) {
  //Antagligen state här också för att sätta onClick och göra olika saker baserat på
  //Om det är för navigering till annan sida
  //Eller för att starta spelet
  return (
    <button
      className={className}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
}