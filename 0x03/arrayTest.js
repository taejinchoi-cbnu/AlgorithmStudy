// 배열 출력 함수
function printArr(arr, len) {
    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(arr[i]);
    }
    console.log(result.join(' '));
}

// 삽입 함수
function insert(pos, val, arr, len) {
    if (pos < 0 || pos > len) {
        console.log("error");
        return len;
    }
    
    for (let i = len; i > pos; i--) {
        arr[i] = arr[i - 1];
    }
    arr[pos] = val;
    
    return len + 1;
}

// 삭제 함수
function erase(pos, arr, len) {
    if (pos < 0 || pos >= len) {
        console.log("error");
        return len;
    }
    
    for (let i = pos; i < len - 1; i++) {
        arr[i] = arr[i + 1];
    }
    
    return len - 1;
}

// 삽입 테스트
function insertTest() {
    console.log("***** insert_test *****");
    const arr = new Array(10);
    arr[0] = 10;
    arr[1] = 20;
    arr[2] = 30;
    let len = 3;
    
    len = insert(3, 40, arr, len); // 10 20 30 40
    printArr(arr, len);
    
    len = insert(1, 50, arr, len); // 10 50 20 30 40
    printArr(arr, len);
    
    len = insert(0, 15, arr, len); // 15 10 50 20 30 40
    printArr(arr, len);
}

// 삭제 테스트
function eraseTest() {
    console.log("\n***** erase_test *****");
    const arr = [10, 50, 40, 30, 70, 20];
    let len = 6;
    
    len = erase(4, arr, len); // 10 50 40 30 20
    printArr(arr, len);
    
    len = erase(1, arr, len); // 10 40 30 20
    printArr(arr, len);
    
    len = erase(3, arr, len); // 10 40 30
    printArr(arr, len);
}

// 메인 실행 부분
function main() {
    insertTest();
    eraseTest();
}

// 프로그램 실행
main();