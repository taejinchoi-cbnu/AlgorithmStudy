const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let inputs = '';

rl.on('line', (line) => {
    inputs = line;
    rl.close();
}).on('close', () => {
    const cnt = new Array(10).fill(0);

    for (const digit of inputs) {
        cnt[+digit]++;
    }
    cnt[6] = Math.ceil((cnt[6] + cnt[9]) / 2);
    cnt[9] = 0;
    let set = Math.max(...cnt);
    console.log(set);
    
});

