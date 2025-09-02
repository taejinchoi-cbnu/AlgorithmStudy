const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const inputs = [];

rl.on('line', (line) => {
    inputs.push(+line);
    if (inputs.length === 3) rl.close();
}).on('close', () => {
    const res = String(inputs[0] * inputs[1] * inputs[2]);
    const cnt = new Array(10).fill(0);
    
    for (const digit of res) {
        cnt[+digit]++;  
    }
    
    console.log(cnt.join('\n'));
});
