import { useState } from "react";
import Job from "./components/Job.js";
import "./App.css";

function App() {
  const [section, setSection] = useState("main");

  return (
    <div className="app">
      {section === "main" && (
        <>
          <h1>Ve a Estudiar!</h1>
          <button 
            className="work-button"
            onClick={() => setSection("Job")}
          >
            Repasar
          </button>
        </>
      )}
      {section === "Job" && <Job />}
    </div>
  );
}

export default App;