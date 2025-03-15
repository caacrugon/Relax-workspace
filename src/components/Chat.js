import { useState } from "react";
function Chat() {
    const [messages, setMessages] = useState([
      { text: "Kira queen", 
        type: "text" 
    },
    {
        text:"Kira queen bites the dusto",
        type: "text"
    }
    ]);
  return (
    <div className="chat">
      <div className="chat-head">
        <img className="p-p" src="perfil.jpg" alt="Perfil" />
        <span>Jefe</span>
      </div>
      <div className="chat-mm">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            {msg.text}
          </div>
        ))}
        <div className="typing">...</div>
      </div>
      <div className="options">
        <button>Sí señor</button>
        <button>Por supuesto jefe</button>
      </div>
    </div>
  );
}

export default Chat;