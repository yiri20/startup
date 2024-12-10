const EventTypes = {
    System: 'system',
    Chat: 'chatMessage',
    MusicUpdate: 'musicUpdate',
};

class EventMessage {
    constructor(from, type, value) {
        this.from = from;
        this.type = type;
        this.value = value;
    }
}

class MusicEventNotifier {
    events = [];
    handlers = [];

    constructor() {
        this.socket = null;
        this.reconnectAttempts = 0; // Track reconnect attempts
        this.maxReconnectAttempts = 5; // Limit retries
        this.connect(); // Initiate connection
    }

    connect() {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
          console.error('Max reconnect attempts reached');
          return;
        }
      
        const port = 4000; // Your server port
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`ws://localhost:4000/ws`);
      
        this.socket.onopen = () => {
            console.log('WebSocket connected.');
            this.reconnectAttempts = 0; // Reset on successful connection
        };
      
        this.socket.onclose = () => {
            console.log('WebSocket closed.');
            if (this.reconnectAttempts < this.maxReconnectAttempts) {
              this.reconnectAttempts++;
              console.log(`Reconnecting attempt ${this.reconnectAttempts}`);
              setTimeout(() => this.connect(), 2000);
            } else {
              console.error('Max reconnect attempts reached.');
            }
        };
      
        this.socket.onmessage = (msg) => {
            try {
                const event = JSON.parse(msg.data);
                this.receiveEvent(event);
            } catch (error) {
            console.error('Failed to parse message:', error);
        }
        };
      
        this.socket.onerror = (error) => {
            console.error('WebSocket Error:', error);
        };
    }

    reconnect() {
        if (this.reconnectAttempts < 5) {
            this.reconnectAttempts++;
            const delay = Math.min(1000 * this.reconnectAttempts, 5000); // Exponential backoff
            setTimeout(() => this.connect(), delay);
        } else {
            console.error('Max reconnect attempts reached');
        }
    }

    broadcastEvent(from, type, value) {
        if (this.socket.readyState === WebSocket.OPEN) {
          const event = new EventMessage(from, type, value);
          this.socket.send(JSON.stringify(event));
          console.log('Event broadcasted:', event);
        } else {
          console.warn('WebSocket not open. Message not sent.');
        }
    }

    addHandler(handler) {
        this.handlers.push(handler);
    }

    removeHandler(handler) {
        this.handlers = this.handlers.filter((h) => h !== handler);
    }

    receiveEvent(event) {
        this.events.push(event);

        this.handlers.forEach((handler) => {
            handler(event);
        });
    }
}

const MusicNotifier = new MusicEventNotifier();

export { EventTypes, MusicNotifier };
