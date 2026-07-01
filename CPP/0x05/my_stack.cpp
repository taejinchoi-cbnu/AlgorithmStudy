#include <bits/stdc++.h>
using namespace std;

const int MAX = 1000005;
int dat[MAX];
int pos = 0;

void push(int x) {
	dat[pos] = x;
	pos++;
}

void pop() {
	cout << dat[pos-1] << endl;
	dat[pos] = 0;
	pos--;
}

int main() {
	push(5);
	push(4);
	push(3);
	pop();
	pop();
	pop();
}
