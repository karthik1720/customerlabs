import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Popup from "./components/Popup";
function App() {
  const [load, setLoad] = useState(false);

  return (
    <div className="appContainer">
      <Navbar text="View Audience" />
      <div className="appSave">
        <button className="saveSegment" onClick={() => setLoad(!load)}>
          Save segment
        </button>
      </div>
      {load && (
        <div className="popupLoader">
          <div className="popupBackground"></div>
          <Popup setLoad={setLoad} />
        </div>
      )}
    </div>
  );
}

export default App;
