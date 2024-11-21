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

module.exports = selectionSort;
