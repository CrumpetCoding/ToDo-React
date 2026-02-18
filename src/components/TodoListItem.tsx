import type { ToDoItem } from "../todos";

type Props = {
    item: ToDoItem,
    deleteItem: (id: ToDoItem["id"]) => void,
    toggleStatus: (id: ToDoItem["id"]) => void,
}

const empty = "⚪";
const checked = "⚫";


function TodoListItem({ item, deleteItem, toggleStatus }: Props) {
    const itemClasses = ["todo-item-text", item.isCompleted ? "completed" : ""];
    return (
        <li>
            <span className={itemClasses.join(" ")}>
                {item.text}
            </span>
            <span className="actionIcon" onClick={() => deleteItem(item.id)}>🗑️</span>
            <span className="actionIcon" onClick={() => toggleStatus(item.id)}>{item.isCompleted ? checked : empty}</span>
        </li>
    );
}

export default TodoListItem;