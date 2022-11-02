const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  const string = (info) => JSON.stringify(info);
  const hash = (hash_this) => crypto.createHash("sha3-512").update(hash_this).digest("hex");

  if (event) {
    if (event.partitionKey) {
      candidate = string(event.partitionKey);
    } else {
      const data = string(event);
      candidate = hash(data);
    }
  }

  if (!event)
    candidate = TRIVIAL_PARTITION_KEY;
    
  if (candidate.length > MAX_PARTITION_KEY_LENGTH)
    candidate = hash(candidate);

  return candidate;
};