const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lineCnt = 0;
let n = 0;
let res = [];

class Stack {
    constructor() {
        this._arr = [];
    }
    push(data) {
        this._arr.push(data);
    }
    pop() {
        let res = this._arr.pop();
        if (res == undefined) return -1;
        else return Number(res);
    }
    top() {
        if (this._arr[this._arr.length - 1] == undefined) return -1;
        else return Number(this._arr[this._arr.length - 1]);
    }
    empty() {
        if (this._arr.length == 0) return 1;
        else return 0;
    }
    size() {
        return Number(stack._arr.length);
    }
}

let stack = new Stack;

rl.on('line', (line) => {

    if (lineCnt === 0) {
        n = Number(line);
        lineCnt++;
    }
    else {
        switch (line.split(' ')[0]) {
          case "push":
              stack.push(Number(line.split(' ')[1]));
              lineCnt++;
              break; 
          case "pop":
              res.push(stack.pop());
              lineCnt++;
              break;
          case "size":
              res.push(stack.size());
              lineCnt++;
              break;
          case "empty":
              res.push(stack.empty());
              lineCnt++;
              break;
          case "top":
              res.push(stack.top());
              lineCnt++;
              break;
                      
    }
    if (lineCnt === n + 1) {
      rl.close();
    }
    
}
}).on('close', () => {
    console.log(res.join('\n'));
    process.exit();
});

