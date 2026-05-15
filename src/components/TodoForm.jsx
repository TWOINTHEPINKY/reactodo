//предоставляет поле ввода и кнопку для создания новой задачи
import { useState } from 'react';

function TodoForm({ onAdd }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onAdd(value);
    setValue('');
  };

  return (
    <form className="to-do__form" onSubmit={handleSubmit}>
      <input
        className="to-do__input"
        placeholder="Следующее дело..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="to-do__submit" type="submit">Добавить</button>
    </form>
  );
}

export default TodoForm;