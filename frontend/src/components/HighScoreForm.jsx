import { InputText } from './InputText';
import { Button } from './Button';

import './HighscoreForm.css'


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
    <div className='game__won'>
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
    </div>
  );
}