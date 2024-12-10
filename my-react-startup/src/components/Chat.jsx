import React, { useState, useEffect } from 'react';
import { EventTypes, MusicNotifier } from '@components/MusicNotifier';

const Chat = () => {
  const [messages, setMessages] = useState([]); // Stores chat messages
  const [input, setInput] = useState(''); // Stores user input
  const [status, setStatus] = useState('Disconnected'); // Connection status
  const [error, setError] = useState(null); // For handling errors

  useEffect(() => {
    const handleEvent = (event) => {
      if (event.type === EventTypes.Chat) {
        setMessages((prev) => [...prev, event.value]); // Append new messages
      }
    };

    const handleSystemEvent = (event) => {
      if (event.type === EventTypes.System) {
        const message = event.value.msg;
        if (message === 'connected') {
          setStatus('Connected');
          setError(null); // Clear errors on successful connection
        } else if (message === 'disconnected') {
          setStatus('Disconnected');
        }
      }
    };

    // Register WebSocket event handlers
    MusicNotifier.addHandler(handleEvent);
    MusicNotifier.addHandler(handleSystemEvent);

    // Cleanup when component unmounts
    return () => {
      MusicNotifier.removeHandler(handleEvent);
      MusicNotifier.removeHandler(handleSystemEvent);
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      try {
        const message = { user: 'Anonymous', text: input };
        MusicNotifier.broadcastEvent('User', EventTypes.Chat, message);
        setInput(''); // Clear the input field
      } catch (e) {
        console.error('Error sending message:', e);
        setError('Failed to send message. Please try again.');
      }
    }
  };

  return (
    <div
      style={{
        border: '1px solid #ddd',
        padding: '10px',
        borderRadius: '5px',
        marginTop: '20px',
        backgroundColor: '#f8f9fa',
      }}
    >
      <h3 style={{ marginBottom: '10px', color: '#0454a8' }}>Live Chat</h3>
      <div style={{ marginBottom: '10px', color: status === 'Connected' ? 'green' : 'red' }}>
        {status === 'Connected' ? 'Connected to chat' : 'Disconnected from chat'}
      </div>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <div
        style={{
          maxHeight: '200px',
          overflowY: 'auto',
          border: '1px solid #ddd',
          padding: '10px',
          marginBottom: '10px',
          backgroundColor: '#fff',
        }}
      >
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
          style={{
            flex: 1,
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: '10px 15px',
            backgroundColor: '#0454a8',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
