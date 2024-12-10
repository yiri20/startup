import React, { useState, useEffect } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('Disconnected');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:4000');
    setSocket(ws);

    ws.onopen = () => {
      console.log('WebSocket connection established.');
      setStatus('Connected');
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        setMessages((prev) => [...prev, message]);
      } catch (error) {
        console.error('Error parsing incoming message:', error);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed.');
      setStatus('Disconnected');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Cleanup when the component unmounts
    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() && socket && socket.readyState === WebSocket.OPEN) {
      const message = { user: 'Anonymous', text: input };
      socket.send(JSON.stringify(message));
      setInput(''); // Clear the input field
    }
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px', marginTop: '20px', backgroundColor: '#f8f9fa' }}>
      <h3 style={{ marginBottom: '10px', color: '#0454a8' }}>Live Chat</h3>
      <div style={{ marginBottom: '10px', color: status === 'Connected' ? 'green' : 'red' }}>
        {status === 'Connected' ? 'Connected to chat' : 'Disconnected from chat'}
      </div>
      <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ddd', padding: '10px', marginBottom: '10px', backgroundColor: '#fff' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: '5px' }}>
            <strong style={{ color: '#333' }}>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
          style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        <button
          onClick={sendMessage}
          style={{ padding: '10px 15px', backgroundColor: '#0454a8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
