class HashTable {
  constructor(size = 10) {
    this.size = size; // Initial size of buckets
    this.bucketHeads = Array.from({ length: size }, () => []);
    this.elementCount = 0; // Track number of elements
    this.loadFactorThreshold = 0.75; // Resize when load factor exceeds 0.75
  }

  // Hash function to calculate index
  hash(key) {
    return key % this.size;
  }

  insert(key, values) {
    // Before insertion, check if load factor exceeds threshold
    if (this.elementCount / this.size > this.loadFactorThreshold) {
      this.resize();
    }

    const index = this.hash(key);
    const bucketArr = this.bucketHeads[index];

    // Check if key already exists and update
    for (let i = 0; i < bucketArr.length; i++) {
      if (bucketArr[i].key === key) {
        bucketArr[i].value.push(...(Array.isArray(values) ? values : [values])); // Merge values
        return;
      }
    }

    // Add new key-value pair
    bucketArr.push({ key, value: Array.isArray(values) ? values : [values] });
    this.elementCount++;
  }

  // Retrieve values by key
  get(key) {
    const index = this.hash(key);
    const bucketArr = this.bucketHeads[index];

    for (let i = 0; i < bucketArr.length; i++) {
      if (bucketArr[i].key === key) {
        return bucketArr[i].value;
      }
    }

    return []; // Key not found
  }

  // Resize the hash table
  resize() {
    const oldBucketHeads = this.bucketHeads;

    // Double the size of the hash table
    this.size *= 2;
    this.bucketHeads = Array.from({ length: this.size }, () => []);
    this.elementCount = 0; // Reset element count

    // Rehash all the old buckets into the new buckets
    for (const bucketArr of oldBucketHeads) {
      for (const item of bucketArr) {
        this.insert(item.key, item.value); // Spread values when re-inserting
      }
    }
  }
}

module.exports = HashTable;
