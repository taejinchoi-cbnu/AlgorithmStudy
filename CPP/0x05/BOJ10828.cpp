#include <bits/stdc++.h>
using namespace std;

int main() {
	int n = 0;
	cin >> n;

	stack<int> S;

	while(n--) {
		string cmd;
		cin >> cmd;
		if (cmd == "push") {
			int x;
			cin >> x;
			S.push(x);
		}
		else if (cmd == "pop") {
			if(S.empty()) {
				cout << -1 << endl;
			}
			else {
				cout << S.top() << endl;
				S.pop();
			}
		}
		else if (cmd == "size") {
			cout << S.size() << endl;
		}
		else if (cmd == "empty") {
			if (S.empty()) cout << 1 << endl;
			else cout << 0 << endl;
		}
		else {
			if (S.empty()) cout << -1 << endl;
			else cout << S.top() << endl;
		}
	}
}
