const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lineCnt = 0;
let n = 0;
let res = [];

rl.on('line', (line) => {

    if (lineCnt === 0) {
        n = Number(line);
        lineCnt++;
    }
    else {
        if (line == '0') {
            res.pop();
            lineCnt++;
        }
        else {
            res.push(Number(line));
            lineCnt++;

        }

        if (lineCnt === n + 1) {
            rl.close();
        }
    }
}).on('close', () => {
    let sum = 0
    if (res.length == 0) {
        console.log(sum);
    }
    else {
        for (let i = 0; i < res.length; i++) {
            sum += res[i];
        }
        console.log(sum);
    }
    
    process.exit();
});
