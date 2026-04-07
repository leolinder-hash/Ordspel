
export function HighscoreForm({
  label,
  buttonText,
  buttonText2,
  className,
  classNameButton,
  playerName,
  onSubmit,
  onChange,
  onPlayAgain
}) {
  return (
    <>
      <p>Congratulations, you won!</p>

      <div className='highscoreForm'>
        <InputText
          label={label}
          className={className}
          value={playerName}
          onChange={onChange}
        />
        <Button
          buttonText={buttonText}
          onClick={onSubmit}
        />
      </div>
      <Button
        buttonText={buttonText2}
        className={classNameButton}
        onClick={onPlayAgain}
      />
    </>
  );
}