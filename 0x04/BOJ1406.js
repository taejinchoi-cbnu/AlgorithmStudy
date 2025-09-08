/* 
1. 첫째 줄 string, 둘째 줄 입력할 명령어 수 M, 3 to M까지 명령어 입력
2. 입력값 setting 완료 3m
3. 명령어 배열에 저장하지 말고 line에서 입력 받고 바로 실행하고 close에서는 답만 출력해주자. 3m
3.1 string 끝에 추가해야하는데 그러면 input string을 string이 아니라 array로 처리해야하나?

-- 제출 결과 출력 초과 --
로직은 적당히 맞음 (테스트 input/output 정상 작동)

4. 제한 초과 터져버렸네 그러면 힌트중에 스택이 있으니 스택으로 처리해보자.
5. 문자열 가로가 아니라 스택처럼 세로로 생각하면 된다.
5.1. 스택을 구현할 것인가 아니면 js 내장 스택을 사용할 것인가.
5.2. 일단 스택 있는걸로 돌려보고 결과 어떻게 나오는지 확인해보자.
*/

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lineCnt = 0;
let m = 0;
let head = null;
let tail = null;
let cursor = null; // cursor는 커서 바로 왼쪽에 있는 문자를 가리킴. null이면 맨 앞

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

// 초기 문자열을 이중 연결 리스트로 변환
function initializeString(line) {
  for (let i = 0; i < line.length; i++) {
    let newNode = new Node(line[i]);
    
    if (head === null) {
      head = newNode;
      tail = newNode;
    } else {
      tail.next = newNode;
      newNode.prev = tail;
      tail = newNode;
    }
  }
  // 커서는 문장의 맨 뒤에 위치 (tail을 가리킴)
  cursor = tail;
}

// L: 커서를 왼쪽으로 한 칸 이동
function moveLeft() {
  if (cursor !== null) {
    cursor = cursor.prev;
  }
}

// D: 커서를 오른쪽으로 한 칸 이동
function moveRight() {
  if (cursor === null) {
    // 맨 앞에서 오른쪽으로 이동
    cursor = head;
  } else if (cursor.next !== null) {
    cursor = cursor.next;
  }
}

// B: 커서 왼쪽 문자 삭제
function deleteLeft() {
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

// P: 커서 왼쪽에 문자 추가
function insertChar(char) {
  let newNode = new Node(char);
  
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

// 명령어 처리
function processCommand(line) {
  const command = line[0];
  
  switch (command) {
    case 'L':
      moveLeft();
      break;
    case 'D':
      moveRight();
      break;
    case 'B':
      deleteLeft();
      break;
    case 'P':
      insertChar(line[2]);
      break;
  }
}

// 결과 출력
function printResult() {
  let result = '';
  let current = head;
  
  while (current !== null) {
    result += current.data;
    current = current.next;
  }
  
  console.log(result);
}

rl.on('line', (line) => {
  if (lineCnt === 0) {
    // 초기 문자열 처리
    if (line.length > 0) {
      initializeString(line);
    }
  } else if (lineCnt === 1) {
    // 명령어 개수 저장
    m = Number(line);
  } else if (lineCnt >= 2 && lineCnt <= m + 1) {
    // 명령어 처리
    processCommand(line);
  }
  
  lineCnt++;
  
  // 모든 명령어 처리 완료시 종료
  if (lineCnt > m + 1) {
    rl.close();
  }
}).on('close', () => {
  printResult();
  process.exit();
});
