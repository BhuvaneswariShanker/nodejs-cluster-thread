const cluster = require('cluster');
const numCPUs = require('os').cpus().length;


const timeBefore = Date.now();
if (cluster.isMaster) {
const num = 100000; // Large number for factorial computation
  const chunkSize = Math.ceil(num / numCPUs);
  const workers = [];
  let results = new Array(numCPUs).fill(BigInt(1));
  let completed = 0;

  console.log(`Master ${process.pid} is running`);
  console.log(`Spawning ${numCPUs} workers...`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    const start = i * chunkSize + 1;
    const end = Math.min((i + 1) * chunkSize, num);

    const worker = cluster.fork();
    workers.push(worker);

    worker.send({ start, end, index: i });

    worker.on('message', (message) => {
      results[message.index] = BigInt(message.result);
      completed++;

      if (completed === numCPUs) {
        // Combine all partial results
        const factorialResult = results.reduce((acc, val) => acc * val, BigInt(1));
        console.log(`Factorial of ${num} is ${factorialResult.toString()}`);
        const timeAfter = Date.now();
        console.log(`Time taken: ${timeAfter - timeBefore}ms`);
        process.exit(0);
      }
    });
  }
} else {
  process.on('message', ({ start, end, index }) => {
    console.log(`Worker ${process.pid} computing factorial from ${start} to ${end}`);
    const result = partialFactorial(start, end);
    process.send({ result: result.toString(), index });
  });
}

// Function to compute factorial in a range
function partialFactorial(start, end) {
    let result = BigInt(1);
    for (let i = BigInt(start); i <= end; i++) {
      result *= i;
    }
    return result;
  }