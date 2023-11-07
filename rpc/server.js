import fetch from 'node-fetch';

const RPC_PORT = process.env.RPC_PORT || 8000;

const makePythonFunction = (name) => (...args) => {
  const postData = {
    jsonrpc: '2.0',
    method: name,
    params: args,
    id: 1 // Needs to exist to get a response, see https://www.jsonrpc.org/specification#request_object
  };

  return fetch(`http://localhost:${RPC_PORT}/`, {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: { 'Content-Type': 'application/json' },
  })
  .then(res => res.json())
  .then(json => {
    if (json.error) {
      throw new Error(json.error.message);
    }
    return json.result;
  });
}

const pythonFunction = makePythonFunction('my_python_function');
const countWords = makePythonFunction('count_words');

// Usage
console.log('\n---- Happy my_python_function() ----');
try {
  const result = await pythonFunction('Hello', 'NMID');
  console.log('Result from my_python_function():', result);  
} catch (e) {
  console.error('Error calling my_python_function():', e);
}

console.log('\n---- Sad my_python_function() ----');
try {
  const result = await pythonFunction('What up', 'NMID');
  console.log('Result from my_python_function():', result);  
} catch (e) {
  console.error('Error calling my_python_function():', e);
}

console.log('\n---- count_words() ----');
countWords(['Once', 'upon', 'a', 'midnight', 'dreary'])
  .then(result => console.log('Result from count_words():', result))
  .catch(error => console.error('Error calling count_words():', error));

console.log('\n---- Timing ----');
let startTime = performance.now();
for (let i = 0; i < 100; i++) {
  let result = await pythonFunction('hello', 'timing');
}
let endTime = performance.now();
let avgTimePerCall = ((endTime - startTime) / 100).toFixed(2);
console.log('Average time per call:', avgTimePerCall, 'ms');

