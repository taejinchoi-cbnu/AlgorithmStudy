# Week1

## 📅 학습 기간

- **기간**: 2025.09.01 ~ 2025.09.07
- **학습 시간/내용**:
  - 01: 30m + 20m / 환경 설정, arraytest, 10808번
  - 02: 40m / 1475, 2577번 문풀 및 리뷰
  - 03: 25m / 3273 문풀 및 리뷰
  - 04: 0x03 마무리 및 PR

---

## 💡 문제 풀이

### 📝 문제 1: ArrayTest

#### 🎯 문제

배열 문제 풀이 전 연습

- **입력**: X
- **출력**: 배열 삽입/삭제 과정이 console로 잘 출력되어야함

#### 🔍 접근 과정

바킹독 깃헙에 올라와있는 함수 빈 부분을 JS로 작성하면 됨

- https://github.com/encrypted-def/basic-algo-lecture/blob/master/0x03/array_test.cpp

**최종 코드**

```javascript
function insert(pos, val, arr, len) {
  if (pos < 0 || pos > len) {
    console.log('삽입 위치 오류');
    return len;
  }

  for (let i = len; i > pos; i--) {
    arr[i] = arr[i - 1];
  }
  arr[pos] = val;

  return len + 1;
}

function erase(pos, arr, len) {
  if (pos < 0 || pos >= len) {
    console.log('삭제 위치 오류');
    return len;
  }

  // pos 다음부터 한 칸씩 앞으로 이동
  for (let i = pos; i < len - 1; i++) {
    arr[i] = arr[i + 1];
  }

  return len - 1;
}
```

#### 💭 배운 점

- C++과 JavaScript의 참조 전달 방식 차이 체크:
  C++의 `int& len`(Call by Reference)와 달리 JavaScript는 원시 타입을 Call by Value로 전달하여 함수 내에서 `len--`해도 원본 변수가 변경되지 않음
- 해결 방법으로 반환값을 사용(`return len - 1`)하는 것이 len과 array를 전역 변수로 선언하지 않고 풀 수 있는 방법.
- 언어별 변수 스코프(scope) 특성으로 인해 동일한 로직이라도 구현 방식이 달라질 수 있음
- JavaScript에서 원시 타입(number, string)은 함수 매개변수로 전달 시 복사본만 전달되어 원본 수정 불가능함을 확인

---

### 📝 문제 2: [백준 10808] 알파벳 개수

#### 🎯 문제

알파벳 소문자로만 이루어진 단어 S가 주어진다. 각 알파벳이 단어에 몇 개가 포함되어 있는지 구하는 프로그램을 작성하시오.

- **입력**: 첫째 줄에 단어 S가 주어진다. 단어의 길이는 100을 넘지 않으며, 알파벳 소문자로만 이루어져 있다.

- **출력**: 단어에 포함되어 있는 a의 개수, b의 개수, …, z의 개수를 공백으로 구분해서 출력한다.

#### 🔍 접근 과정

1. 알파벳 배열 0으로 초기화
2. 입력받은 string에 존재하는 알파벳 배열을 +1
   2.1. 하나씩 다 체크하는 방식으로 하면 O(n)이라 시간 제한 초과x
   2.2. charCodeAt으로 아스키코드로 변환해서 인덱스로 활용하는 방법?
   2.3. index 0을 a, 1을 b ... 이런식으로 일단 풀어보고 최적화 진행하기
3. 알파벳 배열을 print

**1차 시도 코드 (성공)**

```javascript
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
    const index = str.charCodeAt(i) - 'a'.charCodeAt(0);
    if (index >= 0 && index < 26) {
      alpabetCount[index]++;
    }
  }

  rl.close();
}).on('close', () => {
  printAlpabetCount(alpabetCount);
});
```

**최종 코드**

```javascript
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
```

#### 💭 배운 점

- charCodeAt 메서드를 사용하면 string에 존재하는 해당 index 값의 아스키/유니코드 값을 알아낼 수 있다.

### 📝 문제 3: [백준 2577] 숫자의 개수

#### 🎯 문제

세 개의 자연수 A, B, C가 주어질 때 A × B × C를 계산한 결과에 0부터 9까지 각각의 숫자가 몇 번씩 쓰였는지를 구하는 프로그램을 작성하시오.

예를 들어 A = 150, B = 266, C = 427 이라면 A × B × C = 150 × 266 × 427 = 17037300 이 되고, 계산한 결과 17037300 에는 0이 3번, 1이 1번, 3이 2번, 7이 2번 쓰였다.

- **입력**: 첫째 줄에 A, 둘째 줄에 B, 셋째 줄에 C가 주어진다. A, B, C는 모두 100보다 크거나 같고, 1,000보다 작은 자연수이다.

- **출력**: 첫째 줄에는 A × B × C의 결과에 0 이 몇 번 쓰였는지 출력한다. 마찬가지로 둘째 줄부터 열 번째 줄까지 A × B × C의 결과에 1부터 9까지의 숫자가 각각 몇 번 쓰였는지 차례로 한 줄에 하나씩 출력한다.

#### 🔍 접근 과정

1. 자릿수로 끊으려면 나누기 10, 100, ... 이런 식으로 진행해야함
2. 그러면 계산까지는 Int로 하고 String으로 변경한 다음에 string의 index별로 체크
   2.1. toString이라는게 있군
3. 계산 결과의 자릿수별로 분리하는게 key네.
4. charCodeAt으로 각 자릿수 숫자의 code값을 알아낸 다음, for문으로 돌면서 체크하면 될거같은데 왜 출력값이 다르지? (1차 시도 실패)
   5.1. charCodeAt '0' 반환값 체크해야할듯
5. '0'의 charCodeAt 반환값 잘못했음 -48로 해야 0은 0번째 index 위치로 감

**1차 시도 코드 (실패)**

```javascript
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let numbers = new Array(10).fill(0);
let lineCount = 0;
let a = 0;
let b = 0;
let c = 0;

function ABC(a, b, c) {
  return a * b * c;
}

function printNumbers(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}

rl.on('line', (line) => {
  if (lineCount === 0) {
    a = parseInt(line);
    lineCount++;
  } else if (lineCount === 1) {
    b = parseInt(line);
    lineCount++;
  } else {
    c = parseInt(line);
    rl.close();
  }
}).on('close', () => {
  let res = ABC(a, b, c).toString();

  for (let i = 0; i < res.length; i++) {
    numbers[res.charCodeAt(i) - 49]++;
  }
  printNumbers(numbers);
  process.exit();
});
```

**실패 이유**

- charCodeAt()에서 0은 48이다. (49로 함;;)

---

**최종 코드**

```javascript
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let numbers = new Array(10).fill(0);
let lineCount = 0;
let a = 0;
let b = 0;
let c = 0;

function ABC(a, b, c) {
  return a * b * c;
}

function printNumbers(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}

rl.on('line', (line) => {
  if (lineCount === 0) {
    a = parseInt(line);
    lineCount++;
  } else if (lineCount === 1) {
    b = parseInt(line);
    lineCount++;
  } else {
    c = parseInt(line);
    rl.close();
  }
}).on('close', () => {
  let res = ABC(a, b, c).toString();

  for (let i = 0; i < res.length; i++) {
    numbers[res.charCodeAt(i) - 48]++;
  }
  printNumbers(numbers);
  process.exit();
});
```

#### 최적화 시도

1. lineCount를 사용하지 않고 3개만 입력 받으니 inputs 배열에 입력값을 넣다가 length가 3이되면 rl.close로 입력 종료
2. parseInt 대신 + 를 사용하여 string to int 작업 진행
3. 따로 계산 함수 대신 inputs index끼리 곱을 String()으로 감싸서 계산 후 string 처리까지 한번에 (`String()` vs `toString()`)
4. for ~ of 문으로 배열 순회하며 count 배열 증가 작업
5. `join('\n')` 으로 for문으로 배열 print가 아니라 하나의 line으로 끝내기

**최적화 코드**

```javascript
const inputs = [];

rl.on('line', (line) => {
  inputs.push(+line);
  if (inputs.length === 3) rl.close();
}).on('close', () => {
  const res = String(inputs[0] * inputs[1] * inputs[2]);
  const cnt = new Array(10).fill(0);

  for (const digit of res) {
    cnt[+digit]++;
  }

  console.log(cnt.join('\n'));
});
```

**최적화 결과**
제출 번호 아이디 문제 결과 메모리 시간 언어 코드 길이
98053865 xowls000 2577 맞았습니다!! 9720 108 node.js / 수정 471 (최적화 코드)
98051508 xowls000 2577 맞았습니다!! 9728 108 node.js / 수정 842 (기존 코드)

#### 💭 배운 점

- 기존 내용들 조합해서 사용, split, toString, charCodeAt과 같은 것들을 기억하고 잘 사용했다.
- ctrl+shift+l 로 한번에 같은 변수명 수정 가능

#### 참고 자료

- https://gent.tistory.com/467?category=360524
- https://www.freecodecamp.org/korean/news/javascript-number-to-string/

### 📝 문제 4: [백준 1475] 방 번호

#### 🎯 문제

다솜이는 은진이의 옆집에 새로 이사왔다. 다솜이는 자기 방 번호를 예쁜 플라스틱 숫자로 문에 붙이려고 한다.

다솜이의 옆집에서는 플라스틱 숫자를 한 세트로 판다. 한 세트에는 0번부터 9번까지 숫자가 하나씩 들어있다. 다솜이의 방 번호가 주어졌을 때, 필요한 세트의 개수의 최솟값을 출력하시오. (6은 9를 뒤집어서 이용할 수 있고, 9는 6을 뒤집어서 이용할 수 있다.)

- **입력**: 첫째 줄에 다솜이의 방 번호 N이 주어진다. N은 1,000,000보다 작거나 같은 자연수이다.

- **출력**: 첫째 줄에 필요한 세트의 개수를 출력한다.

#### 🔍 접근 과정

1. 0 to 9까지의 array에서 방 번호 숫자를 +1씩 해주면됨.
2. 하지만 6과 9는 돌려서 사용 가능함.
3. 입력받은 숫자를 체크하고 6과 9는 돌려 쓸 수 있으니. 그 부분 체크 후, 0 to 9 array의 Max를 구하면된다.
   3.1. 왜냐면 123455 라는 방 번호면 5가 2개가 필요해서 2 set가 필요함

**1차 시도 (실패)**

```javascript
let inputs = '';

rl.on('line', (line) => {
  inputs = line;
  rl.close();
}).on('close', () => {
  const cnt = new Array(10).fill(0);

  for (const digit of inputs) {
    cnt[+digit]++;
  }
  cnt[6] = Math.ceil(cnt[6] + cnt[9] / 2);
  cnt[9] = 0;
  let set = Math.max(...cnt);
  console.log(set);
});
```

- **실패 이유**:
  - **연산 우선순위 오류**: `cnt[6] + cnt[9] / 2` → `cnt[6] + (cnt[9] / 2)`로 계산됨
    - 올바른 계산: `(cnt[6] + cnt[9]) / 2`
  - **정수 처리**: `Math.ceil()` 없이는 소수점 결과가 나올 수 있음
    - 예: 6이 1개, 9가 2개면 `3/2 = 1.5` → 2세트 필요하지만 1.5로 계산됨

**최종 코드**

```javascript
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
```

#### 💭 배운 점

- 문자열의 각 문자를 처리할 때는 `split()` 없이 `for...of`로 직접 순회 가능
- 2차원 배열 구조(`inputs[0][i]`) 대신 문자열 직접 사용이 더 효율적
- `Math.ceil()`: 올림 함수로 소수점 이하를 정수로 처리
- `Math.max(...array)`: 배열의 최대값을 찾는 가장 효율적인 방법
- `trim()` 입력값의 공백/개행 처리로 예상치 못한 오류 방지

#### 참고 자료

- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/max

---

### 📝 문제 4: [백준 3273] 두 수의 합

#### 🎯 문제

n개의 서로 다른 양의 정수 a1, a2, ..., an으로 이루어진 수열이 있다. ai의 값은 1보다 크거나 같고, 1000000보다 작거나 같은 자연수이다. 자연수 x가 주어졌을 때, ai + aj = x (1 ≤ i < j ≤ n)을 만족하는 (ai, aj)쌍의 수를 구하는 프로그램을 작성하시오.

- **입력**: 첫째 줄에 수열의 크기 n이 주어진다. 다음 줄에는 수열에 포함되는 수가 주어진다. 셋째 줄에는 x가 주어진다. (1 ≤ n ≤ 100000, 1 ≤ x ≤ 2000000)

- **출력**: 문제의 조건을 만족하는 쌍의 개수를 출력한다.

#### 🔍 접근 과정

1. lineCnt == 1, 2에서 받을 array의 size
2. array 입력 받기
3. array 내의 숫자들의 합으로 만들어야하는 수 x
   3.1.2중 for문으로 x를 구하면 되려나. 시간초과 괜찮나 -> 일단 ㄱㄱ
4. 시간 초과됨 이진탐색과 비슷한 two pointer로 문제를 풀면 시간 복잡도 O(n^2) -> O(n)으로 개선되어서
   정답 처리 완료!!

**1차 시도 (실패)**

```javascript
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let inputs = [];
let lineCnt = 0;
let n = 0;
let x = 0;
let res = 0;

rl.on('line', (line) => {
  if (lineCnt === 0) {
    n = Number(line);
    lineCnt++;
  } else if (lineCnt === 1) {
    inputs.push(...line.split(' ').map(Number));
    lineCnt++;
  } else {
    x = Number(line);
    rl.close();
  }
}).on('close', () => {
  for (let i = 0; i < n; i++) {
    for (let j = n + 1; j < n - 1; j++) {
      if (inputs[i] + inputs[j] === x) res++;
    }
  }
  console.log(res);
});
```

- **실패 이유**:
  - 이중 for문으로 하면 O(n^2)의 시간 복잡도로 조건을 맞추지 못함
  - 이중포인터?를 사용해서 입력받은 배열 sort 후 이중 포인터로 계산하면 됨 O(n log n)임

**최종 코드**

```javascript
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let inputs = [];
let lineCnt = 0;
let n = 0;
let x = 0;
let res = 0;

rl.on('line', (line) => {
  if (lineCnt === 0) {
    n = Number(line);
    lineCnt++;
  } else if (lineCnt === 1) {
    inputs.push(
      ...line
        .split(' ')
        .map(Number)
        .sort((a, b) => a - b)
    );
    lineCnt++;
  } else {
    x = Number(line);
    rl.close();
  }
}).on('close', () => {
  let left = 0;
  let right = n - 1;
  while (left < right) {
    let sum = inputs[left] + inputs[right];
    if (sum === x) {
      res++;
      right--;
    } else if (sum > x) {
      right--;
    } else if (sum < x) {
      left++;
    }
  }
  console.log(res);
});
```

#### 최적화 시도

- push 대신 직접 할당 (`=`) 사용
- const로 가능한 변수 (inputs)는 const로 변경해주기

```javascript
let inputs;
let lineCnt = 0;
let n = 0;
let x = 0;

rl.on('line', (line) => {
  if (lineCnt === 0) {
    n = Number(line);
    lineCnt++;
  } else if (lineCnt === 1) {
    inputs = line
      .split(' ')
      .map(Number)
      .sort((a, b) => a - b);
    lineCnt++;
  } else {
    x = Number(line);
    rl.close();
  }
}).on('close', () => {
  let res = 0;
  let left = 0;
  let right = n - 1;
  while (left < right) {
    let sum = inputs[left] + inputs[right];
    if (sum === x) {
      res++;
      right--;
    } else if (sum > x) {
      right--;
    } else {
      left++;
    }
  }
  console.log(res);
});
```

**최적화 결과**

제출 번호 아이디 문제 결과 메모리 시간 언어 코드 길이 제출한 시간
98087985 xowls000 3273 맞았습니다!! 19376 216 node.js / 수정 792 15초 전
98086772 xowls000 3273 맞았습니다!! 25084 228 node.js / 수정 835

#### 💭 배운 점

- 배열에서 문제를 풀 때 조건이 널널하면 -> O(n^2)인 방법으로 풀어도 되지만 O(n log n)으로 풀어야하는 경우 이중 포인터, 이진 탐색등을 사용하면 된다.
- push(...array) vs 직접 할당(=):
  - push(...array)는 스프레드 연산자로 배열을 펼친 후 기존 배열에 추가하는 방식으로 메모리 오버헤드 발생
  - 직접 할당(=)은 단순 참조 변경으로 더 효율적이며, 큰 배열에서 스택 오버플로우 위험 없음
  - 배열 전체 교체 시 직접 할당, 기존 배열에 요소 추가 시 push 사용이 적절
- 투 포인터(Two Pointer) 알고리즘:
  - 정렬된 배열에서 O(n²) → O(n log n)으로 시간복잡도 개선
  - 양 끝에서 시작하여 합을 비교하며 포인터 이동
  - 중복 없는 수열에서 sum === x일 때 left++ 또는 right-- 둘 다 가능

#### 참고 자료

- https://cdragon.medium.com/basics-of-two-pointers-technique-e1a0df57ba7e
- https://www.geeksforgeeks.org/javascript/javascript-program-for-two-pointers-technique/

---

## 📈 이번주 복기

X

### 🔄 이전 주차 대비 개선점

X

### 📚 학습한 내용

- **단항 플러스 연산자 (+)**:

  - 원형: `+value`
  - 설명: 문자열을 숫자로 변환하는 가장 빠르고 간결한 방법. parseInt()보다 성능이 우수하며 코드가 더 간결함
  - Memo: PS 문제에서 깔끔한 입력 처리 시 parseInt() 대신 사용 권장. 단, "123px" 같은 문자 포함 시 NaN 반환하므로 주의. 소수점 처리 가능("3.14" → 3.14), 빈 문자열은 0으로 변환

- **for...of 루프**:

  - 원형: `for (const element of iterable) { /* 처리 */ }`
  - 설명: 이터러블 객체(문자열, 배열, Set, Map 등)의 각 요소를 직접 순회하는 현대적 반복문
  - Memo: 인덱스 관리 불필요해 off-by-one 에러 방지. 문자열 각 문자 순회 시 charAt()이나 인덱스 접근 대신 사용하면 코드 간결화. break/continue 사용 가능

- **Array.join()**:

  - 원형: `array.join(separator)`
  - 설명: 배열의 모든 요소를 구분자(separator)로 연결하여 하나의 문자열로 반환. 기본 구분자는 쉼표(,)
  - Memo: 반복 console.log() 대신 join('\n') 사용하면 I/O 작업을 N회에서 1회로 줄여 성능 대폭 향상. 2차원 배열은 `matrix.map(row => row.join(' ')).join('\n')`로 처리

- **입력 처리 패턴 (inputs.length vs lineCount)**:

  - 원형: 입력 처리 최적화 패턴
  - 설명: inputs.length는 배열 크기로 입력 개수를 체크하는 간결한 방법, lineCount는 각 줄마다 다른 처리가 필요할 때 사용하는 명시적 방법
  - Memo: 모든 입력이 동일 형식이면 inputs.length 사용(코드 간결), 각 줄의 역할이 다르면 lineCount 사용(가독성 향상). 첫 줄만 특별한 경우 하이브리드 패턴 권장

- **const 배열의 동작 원리**:

  - 원형: `const arr = []` / `const obj = {}`
  - 설명: const는 변수의 재할당만 막고, 참조 타입(배열/객체)의 내용 변경(push, pop, 속성 수정)은 허용
  - Memo: 배열/객체는 기본적으로 const 사용(참조 자체는 불변), 재할당이 필요한 원시값(number, string, boolean)만 let 사용. 완전 불변 배열 필요시 Object.freeze() 사용

- **String() vs toString()**:

  - 원형: `String(value)` / `value.toString(radix)`
  - 설명: String()은 생성자 함수로 모든 타입을 안전하게 문자열로 변환, toString()은 메서드로 객체에서 호출하며 진법 변환 가능
  - Memo: 일반적으로 String() 권장(null/undefined도 처리 가능해 더 안전). 진법 변환 필요시 toString(2), toString(16) 등 사용. 숫자 리터럴은 괄호 필수: (255).toString(16)

- **JavaScript 암묵적 타입 변환 (Type Coercion)**:

  - 원형: 자동 타입 변환 메커니즘
  - 설명: 연산자 사용 시 JavaScript가 자동으로 타입을 변환. 곱셈/나눗셈은 숫자로, 덧셈은 문자열 우선으로 변환
  - Memo: "150" \* "266" → 39900 (숫자 변환), "150" + "266" → "150266" (문자열 연결). 자동 변환에 의존하지 말고 명시적 변환(+, Number(), String())으로 의도를 명확히 표현

- **charCodeAt()과 ASCII 값**:

  - 원형: `string.charCodeAt(index)`
  - 설명: 지정된 인덱스 위치의 문자에 대한 UTF-16 코드 유닛 값(0~65535)을 반환. ASCII는 UTF-16의 부분집합
  - Memo: 숫자 문자('0'~'9')는 48~57, 대문자('A'~'Z')는 65~90, 소문자('a'~'z')는 97~122. 인덱스 변환 시: 숫자는 -48 또는 +'문자', 알파벳은 -97('a' 기준) 또는 -65('A' 기준)

- **코드 최적화 기법 요약**:
  - 원형: JavaScript 성능 최적화 패턴
  - 설명: 전역 변수 최소화, 불필요한 함수 제거, I/O 작업 최소화, 현대적 문법 활용 등을 통한 코드 개선
  - Memo: parseInt → +, 반복 console.log → join(), for(i++) → for...of, 여러 전역 변수 → 단일 배열/객체. 가독성과 성능을 동시에 개선하는 방향으로 최적화

---
