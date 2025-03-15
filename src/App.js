import { useState } from "react";
import Navbar from "./components/Navbar.js";
import Job from "./components/Job.js";
import "./App.css";

function App() {
  const [section, setSection] = useState("main");

  return (
    <div className="app">
      <Navbar setSection={setSection} />
      {section === "main" && <h1>Ve a Trabajar!</h1>}
      {section === "Job" && <Job />}
    </div>
  );
}

export default App;