import { useState } from "react";
import { getToDos } from "./todos";

function App() {
  const [toDos, setToDos] = useState(getToDos());
  const [inputText, setInputText] = useState("");

  // type in the textbox "hello"
  // Set up the button so when you click it, it will:
  // you want to create a custom function to do it in one to be easier to read
  function addItem() {
    // 1. Add a new items to the todos state array (using the setToDos([...toDos, { text: inputText, id: blah, isCompleted: false }]))
    // 2. Clear the textbox (using the setInputText(""))
    // 3. Focus the input again

    // Add a console log checking it works
  }

  return (
    <>
      <div className="container">
        <p>Input text: '{inputText}'</p>
        <div className="todo-app">
          <h1>To Do List</h1>
          <div className="input">
            <input
              type="text"
              id="text-box"
              placeholder="add your text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            {/* <button onclick="addItem()">Add</button> */}
          </div>
          <ul id="list-items">
            {/* Loop through all the todo items and spit out them as <li> with just the text, nothing else */}
          </ul>
        </div>
      </div>
      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div> */}
    </>
  );
}

export default App;
