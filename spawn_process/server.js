import { spawn } from 'child_process';

const spawnPython = (filename) => (...args) => {
    return new Promise((resolve, reject) => {
        const data = args.map(arg => JSON.stringify(arg));
        const pythonProcess = spawn('python', [filename, ...data]);

        pythonProcess.stdout.on('data', (data) => {          
          data = JSON.parse(data);
          resolve(data);
        });
        
        pythonProcess.stderr.on('data', (data) => {
          reject(data);
        });
        
        pythonProcess.on('close', (code) => {
          console.log(`child process exited with code ${code}`);
        });
    });
};

const countWords = spawnPython('count_words.py');
const addThenSquare = spawnPython('add_then_square.py');

const result = await countWords({
    words: ['Once', 'upon', 'a', 'midnight', 'dreary']
});
console.log('Count:', result.length_of_words);

const sum = await addThenSquare(1, 2);
console.log('Sum:', sum);