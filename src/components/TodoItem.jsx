//отображает текст задачи и три кнопки (редактировать, копировать, удалить)
import { useRef } from 'react';

function TodoItem({ text, onDelete, onCopy, onEdit }) {
  const spanRef = useRef(null);

  const handleEdit = () => {
    spanRef.current.setAttribute('contenteditable', 'true');
    spanRef.current.focus();
  };

  const handleBlur = () => {
    const span = spanRef.current;
    const newText = span.textContent.trim();
    span.setAttribute('contenteditable', 'false');
    if (newText && newText !== text) {
      onEdit(newText);
    } else if (!newText) {
      span.textContent = text;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      spanRef.current.blur();
    }
  };

  return (
    <li className="to-do__item">
      <span
        ref={spanRef}
        className="to-do__item-text"
        contentEditable="false"
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      >
        {text}
      </span>
      <button
        className="to-do__item-button to-do__item-button_type_edit"
        aria-label="Редактировать"
        onClick={handleEdit}
      />
      <button
        className="to-do__item-button to-do__item-button_type_duplicate"
        aria-label="Копировать"
        onClick={onCopy}
      />
      <button
        className="to-do__item-button to-do__item-button_type_delete"
        aria-label="Удалить"
        onClick={onDelete}
      />
    </li>
  );
}

export default TodoItem;