/*
원형 큐인가?
N개의 원소를 원형 큐로 만들고 K만큼 next를 제거한다?
1. N K 입력
2. 1부터 N까지의 연속된 자연수로 이루어진 원형 큐 생성
3. 원형 큐에서 1부터 next (한바퀴 돈 경우 생각) 제거하고 제거한 것들을 res 배열 혹은 변수에 넣기

---

1. 근데 그냥 순열 만들고 출력만 하면 되는거 아님? 굳이 삭제를?
*/

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let head = null;
let tail = null;
let cursor = null;
let prev = null;
let res = [];

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

function initCircle(n) {
  for (let i = 0; i < n; i++) {
    let newNode = new Node(Number(i+1));
    
    if (head === null) {
      head = newNode;
      tail = newNode;
    } else {      
        tail.next = newNode;
        tail = newNode;
    }
  }
  tail.next = head;
  // 커서는 첫 번째 사람부터 시작
  cursor = head;
}

// k만큼 이동해서 출력
function printRes(n, k) {
  let count = n;
  
  while (count > 0) {
    // k-1번 이동
    for (let i = 0; i < k-1; i++) {
      prev = cursor;
      cursor = cursor.next;
    }
    
    // 현재 cursor가 가리키는 노드를 결과에 추가
    res.push(cursor.data);
    
    // 노드 제거
    if (count === 1) {
      // 마지막 노드인 경우
      cursor = null;
    } else {
      // prev가 없는 경우 처리
      if (prev === null) {
        // 첫 번째부터 시작해서 cursor 이전 노드 찾기
        let temp = cursor;
        while (temp.next !== cursor) {
          temp = temp.next;
        }
        prev = temp;
      }
      
      // 노드 제거
      prev.next = cursor.next;
      cursor = cursor.next;
      prev = null; // 다음 반복을 위해 초기화
    }
    
    count--;
  }
}

rl.on('line', (line) => {
    const [n, k] = line.split(' ').map(Number);

    // n만큼의 원형 리스트 배열 생성
    initCircle(n);
    // pointer를 k만큼 이동하면서 원형 리스트가 null이 될 때 까지 진행
    printRes(n, k);
    rl.close();
}).on('close', () => {
  console.log(`<${res.join(', ')}>`);
  process.exit();
});
