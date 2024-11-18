const express = require('express');
const path = require('path');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Example API endpoint
app.get('/api/example', (req, res) => {
  res.send({ message: 'Backend is working!' });
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
