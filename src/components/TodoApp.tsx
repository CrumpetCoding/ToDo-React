import { useState, useRef, useEffect } from "react";
import { getToDos, saveItems, type ToDoItem } from "../todos";
import TodoListItem from "./TodoListItem";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";

function TodoApp() {
    const [toDos, setToDos] = useState(getToDos());
    const [inputText, setInputText] = useState("");
    const [errorText, setErrorText] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    // Watching whenever the todos are changing, then automatically save them to local storage
    useEffect(() => saveItems(toDos), [toDos]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

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
            <div className="grid">
                <Card id="app-container" className="col-12 md:col-8 md:col-offset-2 lg:col-6 lg:col-offset-3">
                    <h1 className="text-center">To Do List</h1>
                    {/* TODO: Update this to display on a new row on it's own. Use an Message component for the error */}
                    {errorText && <p>Error: {errorText}</p>}
                    <div className="flex justify-content-center align-items-center gap-1">
                        <InputText
                            type="text"
                            ref={inputRef}
                            placeholder="Add a new task..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyUp={(e) => onInputKeyUp(e.key)}
                        />

                        <Button label="Add" icon="pi pi-plus" onClick={() => addItem()} />
                    </div>
                    <ul
                        id="list-items"
                        className="col-12 list-none text-left"
                    >
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
                </Card>
            </div >
        </>
    );
}

export default TodoApp;
