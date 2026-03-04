import { Button } from "primereact/button";
import type { ToDoItem } from "../todos";
import { confirmPopup } from "primereact/confirmpopup";
import "./TodoListItem.css";

type Props = {
    item: ToDoItem,
    deleteItem: (id: ToDoItem["id"]) => void,
    toggleStatus: (id: ToDoItem["id"]) => void,
}

function TodoListItem({ item, deleteItem, toggleStatus }: Props) {
    const itemClasses = ["todo-item-text"];

    const confirmDelete = (target: HTMLElement) => {
        confirmPopup({
            target: target,
            message: "Do you want to delete this row?",
            icon: "pi pi-info-circle",
            defaultFocus: "reject",
            acceptClassName: "p-button-danger",
            accept: () => deleteItem(item.id),
        });
    };

    return (
        <li className="todo-list-item">
            <span className={itemClasses.join(" ")}>
                {/* The cross through is bugged, because the span takes up the whole room
                we need to wrap the text with another span and apply the completed class on there,
                update the TODOListItem.css to fix the width */}
                <span className={item.isCompleted ? "completed" : ""}>{item.text}</span>
            </span >
            <Button
                icon="pi pi-times"
                rounded
                outlined
                aria-label="Cancel"
                onClick={(e) => confirmDelete(e.currentTarget)} />
            <Button
                icon={`pi ${!item.isCompleted ? "pi-check" : "pi-undo"}`}
                rounded
                outlined
                aria-label="Filter"
                onClick={() => toggleStatus(item.id)} />
        </li>
    );
}

export default TodoListItem;