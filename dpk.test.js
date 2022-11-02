const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns with a 128 length trivialKey when given a simple input", () => {
    const trivialKey = deterministicPartitionKey(4234);
    expect(trivialKey).toHaveLength(128)
  });

  it("Returns with stringified { partitionKey } when given input object with partitionKey", () => {
    const fakeEvent = {partitionKey: 12345}
    const trivialKey = deterministicPartitionKey(fakeEvent);
    expect(trivialKey).toBe('12345')
  });

  it("Returns with new partitionKey if length is over 256", () => {
    const fakeEvent = {partitionKey: 'cc1dae373873835aab0e37bc2a003903467db918be634f4dbc4c14d201fced67b009329038758faba3ce226d0c915bd8b8feef0970e5c3dacc1dae373873835aab0e37b81d7543c2a003903467db9166c567a0d8be634f4dbc4c14d2018faba3ce226d0c915bd8b8feef0970e5c3dacc1dae373873835aab0e37b81d7543c2a003903467db9166c567'}
    const trivialKey = deterministicPartitionKey(fakeEvent);
    expect(trivialKey).not.toBe(fakeEvent.partitionKey)
  });
});
