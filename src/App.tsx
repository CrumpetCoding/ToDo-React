import { useState, useRef, useEffect } from "react";
import { getToDos, saveItems, type ToDoItem } from "./todos";
import TodoListItem from "./components/TodoListItem";

function App() {
  const [toDos, setToDos] = useState(getToDos());
  const [inputText, setInputText] = useState("");
  const [errorText, setErrorText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Watching whenever the todos are changing, then automatically save them to local storage
  useEffect(() => saveItems(toDos), [toDos]);

  function addItem() {
    if (inputText.trim() === "") {
      setErrorText("Please enter a valid text");
      return;
    }

    setErrorText("");

    const newTodo: ToDoItem = {
      text: inputText,
      id: crypto.randomUUID(),
      isCompleted: false,
    };
    setToDos([...toDos, newTodo]);
    setInputText("");
    inputRef.current?.focus();
  }

  function onInputKeyUp(key: string) {
    if (key === "Enter") {
      addItem();
    }
  }

  function deleteItem(todoId: string) {
    const filteredToDos = toDos.filter(t => t.id !== todoId);
    setToDos(filteredToDos);
  }

  function toggleStatus(todoId: string) {
    const mappedToDos = toDos.map(t => t.id === todoId
      ? { ...t, isCompleted: !t.isCompleted }
      : t);
    setToDos(mappedToDos);
  }

  return (
    <>
      <div className="container">
        <div className="todo-app">
          <h1>To Do List</h1>
          <div className="input">
            {errorText && <p>Error: {errorText}</p>}
            <input
              type="text"
              ref={inputRef}
              placeholder="add your text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyUp={(e) => onInputKeyUp(e.key)}
            />
            <button onClick={() => addItem()}>Add</button>
          </div>
          <ul id="list-items">
            {toDos.length > 0
              ? toDos.map(t =>
                <TodoListItem
                  key={t.id}
                  item={t}
                  deleteItem={(i) => deleteItem(i)}
                  toggleStatus={(i) => toggleStatus(i)}
                />)
              : (<p>No items yet</p>)}
            {/* Loop through all the todo items and spit out them as <li> with just the text, nothing else */}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
