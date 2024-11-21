class HashTable {
  constructor(size = 10) {
    this.size = size; // Initial size of buckets
    this.buckets = Array.from({ length: size }, () => []);
    this.elementCount = 0; // Track number of elements
    this.loadFactorThreshold = 0.75; // Resize when load factor exceeds 0.75
  }

  // Hash function to calculate index
  hash(key) {
    return key % this.size;
  }

  // Insert value into the hash table
  insert(key, value) {
    if (this.elementCount / this.size > this.loadFactorThreshold) {
      this.resize();
    }

    const index = this.hash(key);
    const bucket = this.buckets[index];

    // Check if key already exists and update
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket[i].value.push(value);
        return;
      }
    }

    // Add new key-value pair
    bucket.push({ key, value: [value] });
    this.elementCount++;
  }

  // Retrieve values by key
  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        return bucket[i].value;
      }
    }

    return []; // Key not found
  }

  // Resize the hash table
  resize() {
    const oldBuckets = this.buckets;

    // Double the size of the hash table
    this.size *= 2;
    this.buckets = Array.from({ length: this.size }, () => []);
    this.elementCount = 0; // Reset element count

    // Rehash all the old buckets into the new buckets
    for (const bucket of oldBuckets) {
      for (const item of bucket) {
        this.insert(item.key, ...item.value); // Spread values when re-inserting
      }
    }
  }
}

module.exports = HashTable;
