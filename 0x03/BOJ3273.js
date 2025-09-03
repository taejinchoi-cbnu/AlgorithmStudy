const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let inputs = [];
let lineCnt = 0;
let n = 0;
let x = 0;
let res = 0;

rl.on('line', (line) => {
  if (lineCnt === 0) {
    n = Number(line);
    lineCnt++;
  } else if (lineCnt === 1) {
    inputs.push(
      ...line
        .split(' ')
        .map(Number)
        .sort((a, b) => a - b)
    );
    lineCnt++;
  } else {
    x = Number(line);
    rl.close();
  }
}).on('close', () => {
  let left = 0;
  let right = n - 1;
  while (left < right) {
    let sum = inputs[left] + inputs[right];
    if (sum === x) {
      res++;
      right--;
    } else if (sum > x) {
      right--;
    } else if (sum < x) {
      left++;
    }
  }
  console.log(res);
});
