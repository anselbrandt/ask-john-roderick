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

      <div>
        {filelist.map((entry, index) => (
          <div key={index}>
            <div>{entry.text}</div>
            <audio controls>
              <source
                src={`/audio/roadwork/001/${entry.file}`}
                type="audio/mpeg"
              />
            </audio>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
