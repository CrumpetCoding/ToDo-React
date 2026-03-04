import TodoApp from "./components/TodoApp";
import { ConfirmPopup } from "primereact/confirmpopup"; // To use <ConfirmPopup> tag

function App() {
  return (
    <>
      <ConfirmPopup />
      <TodoApp />
    </>
  );
}

export default App;
