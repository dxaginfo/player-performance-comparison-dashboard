const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// API Routes
app.get('/api/players/:id', (req, res) => {
  // In a real app, this would fetch data from a database
  res.json({
    id: req.params.id,
    name: 'Example Player',
    position: 'G',
    // ... other player data
  });
});

app.get('/api/players/search', (req, res) => {
  const query = req.query.q;
  // In a real app, this would search the database
  res.json([
    {
      id: 'example-player-1',
      name: `Search Result for ${query} 1`,
      // ... other player data
    },
    {
      id: 'example-player-2',
      name: `Search Result for ${query} 2`,
      // ... other player data
    },
  ]);
});

app.get('/api/players/:id/stats', (req, res) => {
  // In a real app, this would fetch stats from a database
  res.json({
    playerId: req.params.id,
    seasons: [],
    career: {
      // ... career stats
    }
  });
});

app.post('/api/players/compare', (req, res) => {
  const { playerIds } = req.body;
  // In a real app, this would fetch and compare multiple players
  const result = {};
  playerIds.forEach(id => {
    result[id] = {
      playerId: id,
      // ... player stats
    };
  });
  res.json(result);
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('dist'));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
