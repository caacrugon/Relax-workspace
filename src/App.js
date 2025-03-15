import { useState } from "react";
import Navbar from "./components/Navbar.js";
import Chat from "./components/Chat.js";
import Job from "./components/Job.js";
import "./App.css";

function App() {
  const [section, setSection] = useState("main");

  return (
    <div className="app">
      <Navbar setSection={setSection} />
      {section === "main" && <h1>Bienvenido</h1>}  
      {section === "Chat" && <Chat />}
      {section === "Job" && <Job />}

    </div>
  );
}

export default App;