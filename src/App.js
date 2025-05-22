
import React, { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([{ role: "assistant", content: "Hi! Ask me anything and I'll help guide your thinking." }]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    const response = await fetch("https://michellekinzai-backend.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages })
    });
    const data = await response.json();
    setMessages([...newMessages, { role: "assistant", content: data.response }]);
  };

  return (
    <div className="app">
      <div className="chat-window">
        <h1>MichelleKinzai</h1>
        <div className="messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={msg.role}>{msg.content}</div>
          ))}
        </div>
        <div className="input-area">
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && sendMessage()} />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
