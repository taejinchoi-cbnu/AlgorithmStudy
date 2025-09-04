const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let alpabetCount = new Array(26).fill(0);

function printAlpabetCount(arr) {
    console.log(arr.join(' '));
}

rl.on('line', (line) => {
    const str = line.trim();

    for (let i = 0; i < str.length; i++) {
        alpabetCount[str.charCodeAt(i) - 97]++;
    }    

    rl.close();
}).on('close', () => {
    printAlpabetCount(alpabetCount);
});
