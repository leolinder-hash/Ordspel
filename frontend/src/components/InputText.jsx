import './inputText.css'

export function InputText(
  {
    text,
    value,
    onChange,
    onKeyDown,
    className,
    label,
  }) {
  //Måste kolla state så vi kan koppla till chooseWordFunktion
  //Måste eventuellt ha ett till state för namn till highscores
  //Och eventuellt ett till för gissning som ska kopplas till getFeedback func
  //Måste också skicka gissning till en array eller kanske till vår färdiga array i getFeedback?

  console.log(value);

  return (
    <div className='input'>
      {label && <label>{label}</label>}
      <input
        type="text"
        placeholder={text}
        size="50"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className={className}
      />
    </div>
  );
}