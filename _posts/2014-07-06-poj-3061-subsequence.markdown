---
layout: post
title:  "POJ 3061 Subsequence"
date:   2014-07-01 00:00:00 UTC+9
categories: poj, algorithm
---

# POJ 3061 Subsequence

  ひきつづき蟻本をやっている。
  しゃくとり法の問題らしい。
  そもそもしゃくとり法ってなんなの？って思っていたら

  http://d.hatena.ne.jp/komiyam/20120802/1343894601
  に良い説明があった。

    `「ある条件を満たす極小な区間を全て列挙するアルゴリズム」`

  というのは非常にわかりやすい。

    - 条件を満たさなければ右端を進めて区間を広げる。
    - 条件を満たしていれば左端を進めて区間を狭める。

  こちらもすごくしっくりくる。
  今回の場合は、条件が「S以上になっているか」。

``` c++
#include <iostream>
#include <cstdio>
#include <algorithm>
#include <vector>
#include <cmath>

using namespace std;

int main() {
  int T;

  cin >> T;

  for (int i = 0; i < T; i++) {
    int N, S;
    scanf("%d %d", &N, &S);
    vector<int> sequence(N);
    for (int i = 0; i < N; i++) {
      scanf("%d", &sequence[i]);
    }


    int s = 0, t = 0, sum = 0;
    int length = N + 1;

    while (true) {
      while (sum < S && t < N) {
        sum += sequence[t++];
      }
      if (sum < S) {
        break;
      }
      length = min(length, t - s);
      sum -= sequence[s++];
    }
    if (length > N) {
      length = 0;
    }
    printf("%d\n", length);
  }

  return 0;
}
```
