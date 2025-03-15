import { useState } from "react";

function Navbar({ setSection }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>
      {menuOpen && (
        <div className="menu">
        <button onClick={() => setSection("main")}>Inicio</button>
        <button onClick={() => setSection("Job")}>Trabajo</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;