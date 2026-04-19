import './Button.css'

export function Button({ buttonText, onClick, className }) {
  
  return (
    <button
      className={className}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
}