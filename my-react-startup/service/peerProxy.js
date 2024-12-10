import { WebSocketServer } from 'ws';
import { v4 as uuid } from 'uuid';

export function peerProxy(server) {
  const wss = new WebSocketServer({ noServer: true });

  server.on('upgrade', (request, socket, head) => {
    console.log('Upgrade request URL:', request.url);
    if (request.url === '/ws') {
      wss.handleUpgrade(request, socket, head, (ws) => {
        console.log('WebSocket connection upgraded');
        wss.emit('connection', ws, request);
      });
    } else {
      console.log('Invalid WebSocket path:', request.url);
      socket.write('HTTP/1.1 404 Not Found\r\n\r\n');
      socket.destroy();
    }
  });

  const connections = [];

  wss.on('connection', (ws) => {
    const connection = { id: uuid(), alive: true, ws };
    connections.push(connection);

    console.log('New WebSocket connection established');
    ws.on('message', (data) => {
      console.log('Message received:', data);
      connections.forEach((c) => {
        if (c.id !== connection.id) {
          c.ws.send(data);
        }
      });
    });

    ws.on('close', () => {
      console.log('WebSocket connection closed');
      const index = connections.findIndex((c) => c.id === connection.id);
      if (index !== -1) {
        connections.splice(index, 1);
      }
    });

    ws.on('pong', () => {
      connection.alive = true;
    });
  });

  setInterval(() => {
    connections.forEach((connection) => {
      if (!connection.alive) {
        connection.ws.terminate();
      } else {
        connection.alive = false;
        connection.ws.ping();
      }
    });
  }, 10000);
}
