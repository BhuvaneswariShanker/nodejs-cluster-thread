

// Factorial function using recursion
function bigFactorial(n) {
    let result = BigInt(1);
    for (let i = BigInt(2); i <= n; i++) {
      result *= i;
    }
    return result;
  }

const timeBefore = Date.now();
const result = bigFactorial(100000);
console.log(`Factorial of 100 is ${result}`);
const timeAfter = Date.now();
console.log(`Time taken: ${timeAfter - timeBefore}ms`);