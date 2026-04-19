import './CheckBox.css'

export function CheckBox({ isChecked, setIsChecked }) {
  
  return (
    <div
      className='checkbox__input'
    >
      <p>Double letters?</p>
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
    </div>
  );
}