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