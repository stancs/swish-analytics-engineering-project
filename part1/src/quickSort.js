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

module.exports = quickSort;
