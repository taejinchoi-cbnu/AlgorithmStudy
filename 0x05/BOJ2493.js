/*
신호탑의 왼쪽에서  신호탑보다 높은 탑이 받는다.

ex) [6, 9, 5, 7, 4] 라는 input이 들어오면 <- 쪽으로 신호를 날리니까.

4의 신호는 7이 받고
7은 9가 받고 (5는 7보다 낮으니 7의 신호를 못받음)
5의 신호는 9가 받고
9의 신호는 아무도 못받고
6의 신호도 아무도 못받는다.

input[i]의 신호는 input[i-1 to 0]까지 애들 중 first로 input[i]보다 큰 index가 받는다.
let i = 0
for (let j = 배열 길이; j >= 0; j--)
let res = 0;    
input[j] =< input[i]
res = j
if (아무것도 못받음) 0

*/

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n = 0;
let lineCnt = 0;

rl.on('line', (line) => {

    if (lineCnt === 0) {
        n = Number(line);
        lineCnt++
    } 
    else {
        let inputs = line.split(' ').map(Number);
        let n = inputs.length;
        const res = new Array(n).fill(0);
        const stack = [];

        for (let i = 0; i < n; i++) {
            while (stack.length > 0 && inputs[stack[stack.length - 1]] < inputs[i]) {
                stack.pop();
            }

            if (stack.length > 0) {
                res[i] = stack[stack.length - 1] + 1;
            }

            stack.push(i);
        }

        console.log(res.join(' '));
        rl.close();
    }

}).on('close', () => {
    process.exit();
});

/*
<한번 틀리고 재시도>
pop하면 배열 길이가 줄어드니 index를 따로 체크해주어야한다. n-1부터 해서 0까지.
먼저 배열에 입력값을 넣고. pop을 해서 탑을 체크한다.
pop된 결과와 나머지 배열 요소들을 for문으로 거꾸로 돌며 (0 to n이 아니라 n to 0으로)
if pop된 요소보다 큰 값 발견 시 break하고 해당 index (원본)를 res에 넣고 다음 반복문으로 넘어간다.
*/