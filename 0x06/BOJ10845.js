const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }

  enqueue(data) {
    let newNode = new Node(data);
      
    if (this.head == null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
      
    this._size++;
  }

  dequeue() {
    if (this.head == null) {
      return -1;
    } else {
      let popData = this.head.data;
      this.head = this.head.next;
      this._size--;

      if (this.head == null) {
        this.tail = null;
      }
      return popData;
    }
  }

  size() {
    return this._size;
  }
  empty() {
    return this._size === 0 ? 1 : 0;
  }

  front() {
    if (this.head == null) {
      return -1;
    } else {
      return this.head.data;
    }
  }

  back() {
    if (this.tail == null) {
      return -1;
    } else {
      return this.tail.data;
    }
  }
}

let lineCnt = 0;
let n = 0;
let res = [];
let queue = new Queue();

rl.on("line", (line) => {
  if (lineCnt === 0) {
    n = Number(line);
    lineCnt++;
  } else {
    const cmd = line.split(' ');
    const type = cmd[0];

    switch (type) {
      case "push":
        queue.enqueue(Number(cmd[1]));
        break;
      case "pop":
        res.push(queue.dequeue());
        break;
      case "size":
        res.push(queue.size());
        break;
      case "empty":
        res.push(queue.empty());
        break;
      case "front":
        res.push(queue.front());
        break;

      case "back":
        res.push(queue.back());
        break;
    }
    lineCnt++;
  }

  if (lineCnt === n + 1) {
    rl.close();
  }
}).on("close", () => {
  console.log(res.join("\n"));
  process.exit();
});
