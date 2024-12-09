import React, { useState, useEffect } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const ws = React.useRef(null);

  useEffect(() => {
    // Connect to the WebSocket server
    ws.current = new WebSocket('ws://localhost:4000');

    // Listen for messages
    ws.current.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    return () => {
      // Clean up on component unmount
      ws.current.close();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      const message = { user: 'Anonymous', text: input }; // Replace 'Anonymous' with the actual user's name if available
      ws.current.send(JSON.stringify(message));
      setInput(''); // Clear input after sending
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '20px' }}>
      <h3>Live Chat</h3>
      <div
        style={{
          maxHeight: '200px',
          overflowY: 'auto',
          border: '1px solid #ddd',
          padding: '5px',
          marginBottom: '10px',
        }}
      >
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.user}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: '80%', marginRight: '10px' }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
