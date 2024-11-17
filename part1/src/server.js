const restify = require('restify');
const fs = require('fs');
const path = require('path');

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

// Call the hash table builder
buildHashTables(playerData);

// Sorting function: Selection Sort
function selectionSort(arr, sortBy) {
  const data = [...arr];
  const n = data.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (
        (sortBy === 'asc' && data[j].player_id < data[minIdx].player_id) ||
        (sortBy === 'desc' && data[j].player_id > data[minIdx].player_id)
      ) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [data[i], data[minIdx]] = [data[minIdx], data[i]];
    }
  }
  return data;
}

// Quick Sort function
function quickSort(arr, sortBy, low = 0, high = arr.length - 1) {
  if (low < high) {
    // Partition the array
    const partitionIndex = partition(arr, sortBy, low, high);

    // Recursively sort elements before and after the partition
    quickSort(arr, sortBy, low, partitionIndex - 1);
    quickSort(arr, sortBy, partitionIndex + 1, high);
  }
  return arr;
}

// Partition function
function partition(arr, sortBy, low, high) {
  const pivot = arr[high].player_id; // Choose the last element as the pivot
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if ((sortBy === 'asc' && arr[j].player_id <= pivot) || (sortBy === 'desc' && arr[j].player_id >= pivot)) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
  }

  // Place the pivot element in the correct position
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
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
