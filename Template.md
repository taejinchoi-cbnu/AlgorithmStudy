# JavaScript 코딩 테스트 템플릿

---

## 📝 입력 처리 패턴

### 1. 단일 값 입력 (배열)

```js
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on('line', (line) => {
  input.push(line);
  // 바로 처리
  rl.close();
}).on('close', () => {
  // 문제 해결 코드
  process.exit();
});
```

### 2. 단일 값 입력 (한 개의 숫자 또는 문자열)

```js
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (line) => {
  const n = Number(line); // Number 사용
  const str = line.trim(); // 문자열로 사용 시

  // 바로 처리
  rl.close();
}).on('close', () => {
  // 문제 해결 코드
  process.exit();
});
```

### 3. 공백으로 구분된 여러 값 입력

```js
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (line) => {
  const numbers = line.split(' ').map(Number);
  // const [a, b, c] = line.split(' ').map(Number); // 구조 분해 할당
  // const words = line.split(' '); // 문자열 배열

  console.log(numbers);
  rl.close();
}).on('close', () => {
  process.exit();
});
```

### 4. 여러 줄 입력 (첫 줄에 개수 N)

#### 방법 1: lineCount 사용

```js
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let lineCount = 0;
let n = 0;

rl.on('line', (line) => {
  if (lineCount === 0) {
    n = Number(line);
  } else {
    input.push(line);
    if (input.length === n) {
      rl.close();
    }
  }
  lineCount++;
}).on('close', () => {
  solution(n, input);
  process.exit();
});

function solution(n, input) {
  // 문제 풀이
}
```

#### 방법 2: inputs.length 활용

```js
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n = 0;
const inputs = [];

rl.on('line', (line) => {
  if (n === 0) {
    n = Number(line);
  } else {
    inputs.push(line);
    if (inputs.length === n) rl.close();
  }
}).on('close', () => {
  console.log(inputs.join('\n'));
  process.exit();
});
```

### 5. 2차원 배열 입력

```js
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let lineCount = 0;
let n, m;

rl.on('line', (line) => {
  if (lineCount === 0) {
    [n, m] = line.split(' ').map(Number);
  } else {
    input.push(line.split(' ').map(Number));
    if (input.length === n) {
      rl.close();
    }
  }
  lineCount++;
}).on('close', () => {
  solution(n, m, input);
  process.exit();
});

function solution(n, m, matrix) {
  // 2차원 배열 접근: matrix[row][col]
}
```

### 6. 입력이 없는 문제

```js
function main() {
  // 문제 해결 로직
}

main();
```

---

## 💡 추가 팁

### 출력 최적화

```js
// 여러 줄 출력 시 join 사용
console.log(result.join('\n'));

// 2차원 배열 출력
const output = matrix.map((row) => row.join(' ')).join('\n');
console.log(output);
```

### 입력 종료 조건

```js
// 특정 값으로 종료
rl.on('line', (line) => {
  if (line === '0') {
    rl.close();
    return;
  }
  inputs.push(Number(line));
});

// EOF까지 읽기
rl.on('line', (line) => {
  inputs.push(line);
}).on('close', () => {
  // 모든 입력 처리
});
```

### 메모리 효율적인 처리

```js
// 배열에 저장하지 않고 바로 처리
let sum = 0;
rl.on('line', (line) => {
  sum += Number(line);
}).on('close', () => {
  console.log(sum);
});
```