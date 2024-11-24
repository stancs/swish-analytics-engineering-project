const restify = require('restify');
const fs = require('fs');
const path = require('path');

const HashTable = require('./hashTable');
const quickSort = require('./quickSort');

// Load dataset
const playerData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/data.json')));

// Create hash tables
const playerMap = new HashTable();
const eventMap = new HashTable();

// Build hash tables
function buildHashTables(data) {
  data.forEach(item => {
    // Index by playerId
    playerMap.insert(item.player_id, item);

    // Index by eventId
    eventMap.insert(item.event_id, item);
  });
}

function searchHashTables(playerIdStr, eventIdStr) {
  const playerId = playerIdStr ? parseInt(playerIdStr) : null;
  const eventId = eventIdStr ? parseInt(eventIdStr) : null;

  let results = [];

  if (playerId && eventId) {
    // Get results for playerId and eventId and find the intersection
    const playerResults = playerMap.get(playerId);
    const eventResults = eventMap.get(eventId);

    results = playerResults.filter(item => eventResults.includes(item));
  } else if (playerId) {
    // Get results for playerId
    results = playerMap.get(playerId);
  } else if (eventId) {
    // Get results for eventId
    results = eventMap.get(eventId);
  }

  return results || []; // Return an empty array if no results
}

// Call the hash table builder
buildHashTables(playerData);

// Create server
const server = restify.createServer();

// Middleware
server.use(restify.plugins.queryParser());

// Endpoint
server.get('/api/search', (req, res, next) => {
  const { playerId: playerIdStr, eventId: eventIdStr, sortBy } = req.query;
  console.log('===== API REQUEST =====');
  console.log(`playerId: ${playerIdStr}`);
  console.log(`eventId: ${eventIdStr}`);
  console.log(`sorting: ${sortBy}`);
  console.log('========================');

  // Search hash tables
  const filteredData = searchHashTables(playerIdStr, eventIdStr);
  console.log('filteredData', filteredData);

  // Sort data if requested
  const sortedData = sortBy ? quickSort(filteredData, sortBy) : filteredData;
  console.log('sortedData', sortedData);

  // Respond with data
  res.send(sortedData);
  return next();
});

// Start server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}: http://localhost:${PORT}`);
});
