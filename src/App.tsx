import { filelist } from "./filelist";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <a href="https://www.johnroderick.com/" className="logo">
          <h1>Ask John Roderick</h1>
        </a>
      </div>

      <div className="results">
        {filelist.map((entry) => (
          <span className="sentence">{entry.text}</span>
        ))}
      </div>
    </>
  );
}

export default App;
