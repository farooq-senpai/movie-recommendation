const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Example API route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
