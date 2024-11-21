const restify = require('restify');
const fs = require('fs');
const path = require('path');

const quickSort = require('./quickSort');

// Load dataset
const playerData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/data.json')));

// Create hash tables
const playerMap = new Map();
const eventMap = new Map();

// Build hash tables
function buildHashTables(data) {
  data.forEach(item => {
    // Index by playerId
    if (!playerMap.has(item.player_id)) {
      playerMap.set(item.player_id, []);
    }
    playerMap.get(item.player_id).push(item);

    // Index by eventId
    if (!eventMap.has(item.event_id)) {
      eventMap.set(item.event_id, []);
    }
    eventMap.get(item.event_id).push(item);
  });
  // console.log(eventMap);
}

// Search function
function searchHashTables(playerIdStr, eventIdStr) {
  const playerId = parseInt(playerIdStr);
  const eventId = parseInt(eventIdStr);
  let results = [];

  if (eventId && playerId) {
    results = playerMap.get(playerId).filter(r => eventMap.get(eventId).includes(r));
  } else if (playerId) {
    results = playerMap.get(playerId);
  } else if (eventId) {
    results = eventMap.get(eventId);
  }

  // console.log('results: ', results);
  return results;
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
  console.log(`playerId: ${playerIdStr}`);
  console.log(`eventId: ${eventIdStr}`);
  console.log(`sorting: ${sortBy}`);

  // Search hash tables
  const filteredData = searchHashTables(playerIdStr, eventIdStr);
  console.log('filteredData', filteredData);

  // Sort data if requested
  // const sortedData = sortBy ? selectionSort(filteredData, sortBy) : filteredData;
  const sortedData = sortBy ? quickSort(filteredData, sortBy) : filteredData;

  // Respond with data
  res.send(sortedData);
  return next();
});

// Start server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}: http://localhost:${PORT}`);
});
