const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on('line', (line) => {
    input.push(line);
}).on('close', () => {
    const n = Number(input[0]);
    const targetArr = input.slice(1).map(Number);

    const stack = [];
    const res = []; // '+'와 '-' 연산을 저장할 배열
    let currentNum = 1; // 1부터 n까지 오름차순으로 스택에 push될 숫자

    for (let i = 0; i < n; i++) {
        const target = targetArr[i];

        // 현재 push할 숫자가 만들어야 할 target 값보다 작거나 같으면 스택에 push
        while (currentNum <= target) {
            stack.push(currentNum);
            res.push('+');
            currentNum++;
        }

        // PUSH 단계가 끝난 후, 스택의 맨 위 값이 target과 일치하는지 확인합니다.
        const popped = stack.pop(); // 스택에서 값을 하나 꺼냅니다.

        // 꺼낸 값이 target과 다르다면, NO
        if (popped !== target) {
            console.log('NO');
            process.exit();
        }
        res.push('-');
    }

    // 모두 실행되었다면, 수열 생성이 가능한 경우니까 결과 출력
    console.log(res.join('\n'));

    process.exit();
});
