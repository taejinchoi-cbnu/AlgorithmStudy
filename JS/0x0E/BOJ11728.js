const fs = require('fs');

// 입력 전체
const input = fs.readFileSync(0).toString().split(/\s+/);

let idx = 0;
const N = Number(input[idx++]);
const M = Number(input[idx++]);

// 배열 A와 B 파싱
const arrayA = [];
for (let i = 0; i < N; i++) arrayA.push(Number(input[idx++]));

const arrayB = [];
for (let i = 0; i < M; i++) arrayB.push(Number(input[idx++]));

let A = 0;
let B = 0; 
const result = [];

while (A < N && B < M) {
  if (arrayA[A] <= arrayB[B]) {
    result.push(arrayA[i++]);
  } else {
    result.push(arrayB[B++]);
  }
}

// 남은 요소들 처리
while (A < N) result.push(arrayA[A++]);
while (B < M) result.push(arrayB[B++]);

console.log(result.join(' '));