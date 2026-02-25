import TodoApp from "./components/TodoApp";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
import "/node_modules/primeflex/primeflex.css";
import "primeflex/themes/primeone-dark.css";

function App() {
  return (
    <PrimeReactProvider>
      <TodoApp />
    </PrimeReactProvider>
  );
}

export default App;
