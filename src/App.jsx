//управляет списком задач, сохраняет его в localStorage, рендерит форму и список
import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import { defaultItems } from './constants/defaultItems';

const STORAGE_KEY = 'tasks';

function App() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [...defaultItems];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (text) => {
    if (!text.trim()) return;
    setItems([text, ...items]);
  };

  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const copyItem = (index) => {
    const text = items[index];
    setItems([text, ...items]);
  };

  const editItem = (index, newText) => {
    if (!newText.trim()) return;
    const updated = [...items];
    updated[index] = newText;
    setItems(updated);
  };

  return (
    <main className="main">
      <section className="to-do">
        <h1 className="to-do__title">Список дел</h1>
        <TodoForm onAdd={addItem} />
        <ul className="to-do__list">
          {items.map((task, idx) => (
            <TodoItem
              key={idx}
              text={task}
              onDelete={() => deleteItem(idx)}
              onCopy={() => copyItem(idx)}
              onEdit={(newText) => editItem(idx, newText)}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;