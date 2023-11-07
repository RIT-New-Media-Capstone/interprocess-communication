import redis from 'redis';

// Create a publisher client
const publisher = await redis.createClient().connect();

// Create a subscriber client
const subscriber = await redis.createClient().connect();

// Publish the message
const incrementObj = {
    amount: 1
};
setInterval(() => {
    incrementObj.amount = incrementObj.amount * 2;

    publisher.publish('set-increment', JSON.stringify(incrementObj));
}, 5000);

// Listen for messages
subscriber.subscribe('current-increment', (message, channel) => {
  console.log(`Current increment: ${message}`);
});

subscriber.subscribe('current-value', (message, channel) => {
  console.log(`VALUE: ${message}`);
});