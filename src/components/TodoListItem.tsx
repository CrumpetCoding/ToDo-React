import { Button } from "primereact/button";
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
            < span className={itemClasses.join(" ")} >
                {item.text}
            </span >
            <Button className="actionIcon" icon="pi pi-times" rounded outlined aria-label="Cancel" onClick={() => deleteItem(item.id)} />
            <Button className="actionIcon" icon="pi pi-check" rounded outlined aria-label="Filter" onClick={() => toggleStatus(item.id)} />
        </li >
    );
}

export default TodoListItem;