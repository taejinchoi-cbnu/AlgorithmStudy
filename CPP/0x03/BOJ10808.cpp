#include <iostream>
#include <string>

using namespace std;

int main() {
	ios::sync_with_stdio(0);
	cin.tie(0);

	string S;
	cin >> S;
	int alp[26] = {0};

	for (int i = 0; i < S.size(); i++) {
		alp[S[i]-'a'] += 1;
	}

	for (int i = 0; i < S.size(); i++) {
		cout << alp[i] << ' ';
	}
	cout << endl;	
}
