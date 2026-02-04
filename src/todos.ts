type ToDoItem = {
    text: string,
    isCompleted: boolean,
    id: string,
}

function validateToDo(todo: unknown): ToDoItem | null {
    const isValidObject = typeof todo === "object" && todo;
    if (!isValidObject) {
        return null;
    }

    const objectHasAllProperties = "text" in todo && "isCompleted" in todo && "id" in todo;
    if (!objectHasAllProperties) {
        return null;
    }

    // Validate the types of the properties from the object
    if (typeof todo.id !== "string" || typeof todo.isCompleted !== "boolean" || typeof todo.text !== "string") {
        return null;
    }

    return {
        id: todo.id,
        isCompleted: todo.isCompleted,
        text: todo.text,
    };
}

export function getToDos(): ToDoItem[] {
    const localStorageTodos = localStorage.getItem("toDos");

    if (!localStorageTodos) {
        return [];
    }

    let parsedToDos: unknown;

    try {
        parsedToDos = JSON.parse(localStorageTodos);
    } catch {
        return [];
    }

    // Checking if parsedToDos is an array and has at least one item
    if (Array.isArray(parsedToDos) && parsedToDos.length > 0) {
        const results: ToDoItem[] = [];
        const idSet = new Set<string>();

        parsedToDos.forEach((pTodo: unknown) => {
            const validated = validateToDo(pTodo);

            if (validated && !idSet.has(validated.id)) {
                // Then check that all the ids are unique (loop through the results and use a Set to track the ids)
                // If any are duplicate then remove them from the result array
                results.push(validated);
                idSet.add(validated.id);
            }
        });
        return results;
    };

    return [];
}

export function saveItems(todos: ToDoItem[]): void {
    localStorage.setItem("toDos", JSON.stringify(todos));
}