# JavaScript 코딩 테스트 템플릿

---

## 📝 입력 처리 패턴

### 1. 기본 readline 설정

```js
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 입력을 저장할 배열
let input = [];

rl.on('line', (line) => {
  input.push(line); // 각 줄을 배열에 저장
}).on('close', () => {
  // 여기에 문제 해결 코드 작성
  solution();
  process.exit();
});

function solution() {
  // 문제 풀이 로직
  console.log(input);
}
```

**설명**: 가장 기본적인 입력 처리 방식입니다. 모든 입력을 배열에 저장한 후, 입력이 종료되면 solution 함수에서 처리합니다.

- `input` 배열에 각 줄이 문자열로 저장됩니다
- 백준에서는 Ctrl+D (또는 EOF)로 입력이 종료됩니다
- 로컬 테스트 시 Ctrl+C로 프로그램을 종료할 수 있습니다

### 2. 단일 값 입력 (한 개의 숫자 또는 문자열)

```js
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (line) => {
  const n = parseInt(line); // 숫자로 변환
  // const str = line.trim(); // 문자열로 사용 시

  // 바로 처리
  console.log(n * 2);

  rl.close();
}).on('close', () => {
  process.exit();
});
```

**설명**: 입력이 한 줄에 하나의 값만 있을 때 사용합니다.

- 예시 입력: `5` 또는 `hello`
- `parseInt()`: 문자열을 정수로 변환
- `parseFloat()`: 실수로 변환할 때 사용
- `trim()`: 앞뒤 공백 제거

### 3. 공백으로 구분된 여러 값 입력

```js
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (line) => {
  // 공백으로 분리하여 숫자 배열로 변환
  const numbers = line.split(' ').map(Number);
  // const [a, b, c] = line.split(' ').map(Number); // 구조 분해 할당

  // 문자열 배열로 사용
  // const words = line.split(' ');

  console.log(numbers);
  rl.close();
}).on('close', () => {
  process.exit();
});
```

**설명**: 한 줄에 공백으로 구분된 여러 값을 입력받을 때 사용합니다.

- 예시 입력: `1 2 3 4 5`
- `split(' ')`: 공백을 기준으로 문자열을 배열로 분리
- `map(Number)`: 각 요소를 숫자로 변환 (Number 함수가 parseInt보다 간결)
- 구조 분해 할당으로 변수에 바로 할당 가능

### 4. 여러 줄 입력 (첫 줄에 개수 N)

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
    n = parseInt(line); // 첫 줄: 입력 개수
  } else {
    input.push(line); // 나머지 줄: 데이터
    if (input.length === n) {
      rl.close(); // n개 입력 받으면 종료
    }
  }
  lineCount++;
}).on('close', () => {
  // 입력 처리
  solution(n, input);
  process.exit();
});

function solution(n, input) {
  // 문제 풀이
  for (let i = 0; i < n; i++) {
    console.log(input[i]);
  }
}
```

**설명**: 첫 줄에 데이터 개수 N이 주어지고, 다음 N개 줄에 데이터가 주어질 때 사용합니다.

- 예시 입력:
  ```
  3
  apple
  banana
  orange
  ```
- 카운터 변수로 입력 순서를 추적
- N개를 모두 받으면 자동으로 입력 종료

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
    [n, m] = line.split(' ').map(Number); // 행, 열 개수
  } else {
    // 각 행을 숫자 배열로 변환하여 저장
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
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      process.stdout.write(matrix[i][j] + ' ');
    }
    console.log();
  }
}
```

**설명**: 행렬이나 그래프 문제에서 2차원 배열을 입력받을 때 사용합니다.

- 예시 입력:
  ```
  3 4
  1 2 3 4
  5 6 7 8
  9 10 11 12
  ```
- 첫 줄: 행(n)과 열(m)의 개수
- 나머지: n개의 줄에 각각 m개의 값
- `matrix[i][j]`로 접근 (i: 행 인덱스, j: 열 인덱스)

---

## 🔧 자주 사용하는 유틸리티 함수

### 1. 배열 초기화

```js
// 1차원 배열 초기화
const arr1D = new Array(n).fill(0); // 크기 n, 모든 값 0
const arr1D_2 = Array.from({ length: n }, () => 0); // 같은 결과

// 2차원 배열 초기화 (주의: fill 사용 시 참조 문제)
// 잘못된 방법 - 모든 행이 같은 배열을 참조
// const wrong2D = new Array(n).fill(new Array(m).fill(0));

// 올바른 방법
const arr2D = Array.from({ length: n }, () => new Array(m).fill(0));
// 또는
const arr2D_2 = Array.from({ length: n }, () =>
  Array.from({ length: m }, () => 0)
);

// 방문 배열 (boolean)
const visited = new Array(n).fill(false);
const visited2D = Array.from({ length: n }, () => new Array(m).fill(false));
```

**설명**: 동적 프로그래밍이나 그래프 탐색에서 자주 사용하는 배열 초기화 패턴입니다.

- `new Array(n).fill(value)`: 크기 n인 배열을 value로 채움
- `Array.from()`: 더 유연한 배열 생성 (콜백 함수 사용 가능)
- **중요**: 2차원 배열 생성 시 fill()로 배열을 넣으면 모든 행이 같은 배열을 참조하게 되므로 주의!

### 2. 정렬 패턴

```js
// 숫자 배열 정렬
const numbers = [3, 1, 4, 1, 5, 9];

// 오름차순
numbers.sort((a, b) => a - b); // [1, 1, 3, 4, 5, 9]

// 내림차순
numbers.sort((a, b) => b - a); // [9, 5, 4, 3, 1, 1]

// 문자열 배열 정렬
const words = ['banana', 'apple', 'cherry'];

// 사전순 정렬 (기본)
words.sort(); // ['apple', 'banana', 'cherry']

// 길이순 정렬
words.sort((a, b) => a.length - b.length);

// 객체 배열 정렬
const people = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 },
];

// 나이순 정렬
people.sort((a, b) => a.age - b.age);

// 다중 조건 정렬 (나이 같으면 이름순)
people.sort((a, b) => {
  if (a.age !== b.age) return a.age - b.age;
  return a.name.localeCompare(b.name);
});
```

**설명**: JavaScript의 sort() 메서드는 기본적으로 문자열로 변환하여 정렬하므로, 숫자 정렬 시 반드시 비교 함수를 제공해야 합니다.

- 비교 함수가 음수를 반환하면 a가 b보다 앞에 위치
- 0을 반환하면 순서 유지
- 양수를 반환하면 b가 a보다 앞에 위치
- `localeCompare()`: 문자열을 현재 로케일에 맞게 비교

### 3. 좌표 이동 (상하좌우)

```js
// 4방향 이동 (상, 하, 좌, 우)
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

// 8방향 이동 (대각선 포함)
const dx8 = [-1, -1, -1, 0, 0, 1, 1, 1];
const dy8 = [-1, 0, 1, -1, 1, -1, 0, 1];

// 현재 위치에서 4방향 탐색
function explore(x, y, n, m) {
  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    // 범위 체크
    if (nx >= 0 && nx < n && ny >= 0 && ny < m) {
      // 유효한 좌표
      console.log(`이동 가능: (${nx}, ${ny})`);
    }
  }
}

// 나이트 이동 (체스)
const knightDx = [-2, -2, -1, -1, 1, 1, 2, 2];
const knightDy = [-1, 1, -2, 2, -2, 2, -1, 1];
```

**설명**: 그래프 탐색이나 시뮬레이션 문제에서 격자 위의 이동을 처리할 때 사용합니다.

- dx, dy 배열의 같은 인덱스가 한 방향을 나타냄
- 반드시 이동 후 좌표가 유효한 범위 내에 있는지 확인
- 문제에 따라 이동 방향을 커스터마이징 가능

### 4. 수학 관련 유틸리티

```js
// 최대공약수 (유클리드 호제법)
function gcd(a, b) {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// 재귀 버전
function gcdRecursive(a, b) {
  return b === 0 ? a : gcdRecursive(b, a % b);
}

// 최소공배수
function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

// 소수 판별
function isPrime(n) {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;

  // 6k ± 1 최적화
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) {
      return false;
    }
  }
  return true;
}

// 에라토스테네스의 체 (n까지의 모든 소수)
function sieveOfEratosthenes(n) {
  const isPrime = new Array(n + 1).fill(true);
  isPrime[0] = isPrime[1] = false;

  for (let i = 2; i * i <= n; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= n; j += i) {
        isPrime[j] = false;
      }
    }
  }

  // 소수 배열 반환
  const primes = [];
  for (let i = 2; i <= n; i++) {
    if (isPrime[i]) primes.push(i);
  }
  return primes;
}

// 팩토리얼
function factorial(n) {
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// 조합 (nCr)
function combination(n, r) {
  if (r > n) return 0;
  if (r === 0 || r === n) return 1;

  // 파스칼의 삼각형 이용
  const dp = Array.from({ length: n + 1 }, () => new Array(r + 1).fill(0));

  for (let i = 0; i <= n; i++) {
    dp[i][0] = 1;
    if (i <= r) dp[i][i] = 1;
  }

  for (let i = 2; i <= n; i++) {
    for (let j = 1; j <= Math.min(i - 1, r); j++) {
      dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
    }
  }

  return dp[n][r];
}
```

**설명**: 수학 관련 문제에서 자주 사용하는 함수들입니다.

- **GCD/LCM**: 최대공약수와 최소공배수는 많은 수학 문제의 기초
- **소수 판별**: 단일 수 판별은 O(√n), 여러 수는 에라토스테네스의 체 사용
- **팩토리얼**: 큰 수의 경우 BigInt 사용 고려
- **조합**: 동적 프로그래밍으로 효율적 계산

### 5. 문자열 처리

```js
// 문자열 뒤집기
const reversed = str.split('').reverse().join('');

// 팰린드롬(회문) 체크
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}

// 문자 빈도수 계산
function charFrequency(str) {
  const freq = {};
  for (const char of str) {
    freq[char] = (freq[char] || 0) + 1;
  }
  return freq;
}

// Map 사용 버전
function charFrequencyMap(str) {
  const freq = new Map();
  for (const char of str) {
    freq.set(char, (freq.get(char) || 0) + 1);
  }
  return freq;
}

// 아나그램 체크
function isAnagram(str1, str2) {
  if (str1.length !== str2.length) return false;

  const freq1 = charFrequency(str1);
  const freq2 = charFrequency(str2);

  for (const char in freq1) {
    if (freq1[char] !== freq2[char]) return false;
  }
  return true;
}
```

**설명**: 문자열 관련 문제에서 유용한 패턴들입니다.

- `split('')`: 문자열을 문자 배열로 변환
- `join('')`: 배열을 문자열로 합치기
- Map vs Object: Map이 더 빠르고 모든 타입의 키 사용 가능

---

## 💡 백준 문제 유형별 템플릿 선택 가이드

### 입출력 유형별 선택

- **단일 입력** → 패턴 2 사용
- **한 줄에 여러 값** → 패턴 3 사용
- **N개의 줄** → 패턴 4 사용
- **2차원 배열/그래프** → 패턴 5 사용
- **입력 개수가 정해지지 않은 경우** → 패턴 1 사용 (EOF까지 읽기)

### 문제 유형별 유틸리티

- **DP 문제** → 배열 초기화 함수 활용
- **그래프 탐색** → 좌표 이동, 2차원 visited 배열
- **정렬 문제** → 정렬 패턴 참고
- **수학/정수론** → GCD, LCM, 소수 판별 함수
- **문자열** → 문자열 처리 유틸리티

### 성능 최적화 팁

1. **console.log 최소화**: 출력이 많을 때는 배열에 모아서 한 번에 출력

   ```js
   const output = [];
   for (let i = 0; i < n; i++) {
     output.push(result[i]);
   }
   console.log(output.join('\n'));
   ```

2. **문자열 연결**: `+` 대신 배열 join 사용

   ```js
   // 느림
   let str = '';
   for (let i = 0; i < n; i++) {
     str += i + ' ';
   }

   // 빠름
   const arr = [];
   for (let i = 0; i < n; i++) {
     arr.push(i);
   }
   console.log(arr.join(' '));
   ```

3. **Map vs Object**: 빈번한 조회/삽입은 Map이 더 효율적

4. **BigInt 사용**: JavaScript의 Number는 2^53-1까지만 정확. 큰 수는 BigInt 사용
   ```js
   const big = BigInt(num);
   console.log(big.toString()); // 출력 시 toString() 필요
   ```

---

## 📚 참고사항

- 백준은 Node.js 버전이 낮을 수 있으므로 최신 문법 사용 주의
- 입력이 끝나지 않으면 시간 초과가 발생할 수 있음
- 로컬 테스트 시 입력 파일을 만들어 리다이렉션 사용 권장: `node solution.js < input.txt`
- 메모리 제한이 있는 문제는 불필요한 배열 생성 최소화
