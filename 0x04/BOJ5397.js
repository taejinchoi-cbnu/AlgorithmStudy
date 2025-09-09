const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lineCnt = 0;
let head = null;
let tail = null;
let cursor = null;
let n = 0;

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

// <가 입력된 경우
function moveLeft() {
  if (cursor !== null) {
    cursor = cursor.prev;
  }
}

// >가 입력된 경우
function moveRight() {
  if (cursor === null) {
    cursor = head;
  } else if (cursor.next !== null) {
    cursor = cursor.next;
  }
}

// -가 입력된 경우
function deleteNode() {
  if (cursor === null) return; // 맨 앞이면 무시
  
  let nodeToDelete = cursor;
  
  // 커서를 왼쪽으로 이동
  cursor = cursor.prev;
  
  // 노드 연결 수정
  if (nodeToDelete.prev !== null) {
    nodeToDelete.prev.next = nodeToDelete.next;
  } else {
    head = nodeToDelete.next;
  }
  
  if (nodeToDelete.next !== null) {
    nodeToDelete.next.prev = nodeToDelete.prev;
  } else {
    tail = nodeToDelete.prev;
  }
}

// 그냥 문자열이 입력된 경우
function insertNode(data) {
  let newNode = new Node(data);
  
  if (cursor === null) {
    // 맨 앞에 삽입
    if (head === null) {
      head = tail = newNode;
    } else {
      newNode.next = head;
      head.prev = newNode;
      head = newNode;
    }
  } else {
    // cursor 오른쪽에 삽입
    newNode.next = cursor.next;
    newNode.prev = cursor;
    
    if (cursor.next !== null) {
      cursor.next.prev = newNode;
    } else {
      tail = newNode;
    }
    
    cursor.next = newNode;
  }
  
  // 커서를 새로 삽입한 문자로 이동
  cursor = newNode;
}


rl.on('line', (line) => {
    if (lineCnt === 0) {
        n = Number(line);
    } else {
        let testCase = line;
        head = null;
        tail = null;
        cursor = null;

        for (let x of testCase) {
            switch (x) {
                case '<':
                    moveLeft();
                    break;
                case '>':
                    moveRight();
                    break;
                case '-':
                    deleteNode();
                    break;
                default:
                    insertNode(x);
                    break;
            }
        }
        let result = '';    
        let current = head;
        
        while (current !== null) {
            result += current.data;
            current = current.next;
        }

        console.log(result);

        if (lineCnt === n + 1) {
            rl.close();
        }

    }
    lineCnt++;

}).on('close', () => {
  process.exit();
});
