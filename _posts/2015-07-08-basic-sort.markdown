---
layout: post
title:  Selection sort
date:   2015-07-08 00:00:00 UTC+9
categories: programming, algorithm
---

<script type="text/javascript"
         src="http://kumabook.github.io/kumagorithm/javascripts/dist/kumagorithm.js">
</script>

プログラミングの基礎練。まずはベーシックなソートのおさらい。

## Selection sort

まずは、セレクションソート。これは、N個の数をソートするならば


```
最も小さいものを探してその数を最初にもってくる
```

という操作をN回繰り返すというシンプルなソートである。
計算量は、campare(比較)とswap(交換) の２つの操作をベースに見積もることとする。

N個の数から一番小さい数を探すには N-1回の比較が必要になる。
これをN回繰り返すので、compareの数は

```
(N-1) + (N-2) + (N-3) + ... = 1/2 * N^2
```

となる。等差数列の和ですね。なつい。

exchangeは、小さい数が見つかった後それを左橋に移動するために一回するので、

```
N
```

よって、計算量は

```
O(1/2 * N^2 + N) = O(N^2)
```

視覚化してみた。
青色の箇所にくる数を探すために赤色の数を順にチェックしている。


<div id="selection-sort-container"></div>

<script type="text/javascript">
  var container = document.getElementById('selection-sort-container');
  kumagorithm.render(container, "selection-sort");
</script>

## Insertion sort

次は挿入ソート。

挿入ソートは漸化式っぽく考えるとわかりやすい。

```
i-1番目までが整列しているとして、i番目の要素を0..i番目の中で正しい位置に挿入する
```

を繰り返す。最初はi=1で空の配列に要素に挿入。compare0。次は1個の配列に挿入する。前に入れるか後ろにいれるかでcompare1回、
前に入れる場合は1回swapする。i=Nのときは、compareは最大N-1回、swapもN-1回、最小で比較1回のみ。
全体ではBest caseのとき compare N-1回、swap 0回、整列済みのときである。Worst caseは compare 1/2 N^2回、
swap 1/2 N^2回。元の配列が逆順に並んでいる場合である。
計算量としては

```
O(N) ~ O(N^2)
```

<div id="insertion-sort-container"></div>
<script type="text/javascript">
  var insertion = document.getElementById('insertion-sort-container');
  kumagorithm.render(insertion, "insertion-sort");
</script>

## Shell sort

最後はシェルソート。シェルソートは挿入ソートの改良版である。
挿入ソートは

```
逆順に並んでいるときに遅い
```

という弱点があった。

```
とびとびのinsertion sortやってだんだんその間隔を狭めていく
```

というアイデアで改良されたものである。
実際改良されているからすごいし、興味深い。
「とびとび」いったが、どのような間隔でやるかも一つのトピックでいくつか流儀がある。

- 1, 3, 7, 15, 31, 63 … Powers of two minus one.
- 1, 4, 13, 40, 121, 364…3x + 1 ←　こっちが多い。平均計算量：O (N ^ 3/2)

<div id="shell-sort-container"></div>
<script type="text/javascript">
  var insertion = document.getElementById('shell-sort-container');
  kumagorithm.render(insertion, "shell-sort");
</script>

今日はここまで、ソートはあとマージソートとクイックソートがぐらいをやるつもり。
