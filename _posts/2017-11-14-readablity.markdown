---
layout: post
title:  本文抽出の続き
date:   2017-11-14 20:44:42 +0900
categories: rust, programming, nlp
---

夏に取り組んでいた本文抽出の続き。

extractcontentを参考に実装していたが、
途中からreadabilityを日本語・html5対応させた方が良さそうという気がしてきて
結局arc90 のreadability rust portを作るという感じにした。

- [repo](https://github.com/kumabook/readability)
- [demo](http://readability-rs.herokuapp.com/web/index.html) [repo](https://github.com/kumabook/readability-demo)
- [cli](https://github.com/kumabook/readability-cli)


[python 実装](https://github.com/kingwkb/readability)を元に作ったが、
言語やライブラリの違いから、中身の実装はそこそこ違う。
HTML５対応と日本語対応はもちろんだが、
今、TYPICAで使っている120サイトを食わしてみて、スコアに使う単語や正規表現などを追加したので、そこそこの精度は上がっていると思う。

本文抽出を実装して見た感想は「正直しんどい」
- 結果を目視するしかない
- スコア計算はあまり偏った正規表現を使うと「あっちが立てばこっちが立たず」状態
- rust+html5everで実装するのが辛かった。いい勉強にはなったが、僕もpython+BeautifulSoupでゆるふわ実装したかった。

元のアルゴリズムを考えたarc90 labというのが考案したらしい（元ソースはどこにあるかよくわからない）が、改めてよく考えたなと感心する。実際にテストしていくうちに、自分のバグであることが多かったり、既存の正規表現に単語を追加するだけで、なんとかなったので。

最初に見つけたpython実装を参考にしたが、今一番ちゃんとメンテされてるのはmozillaがforkした実装かなと思う。
https://github.com/mozilla/readability/

時間はかかったが、既存のライブラリ使って終了よりもポーティングしたことによって、
中身が理解できて改善できるようにもなった。
大事な技術はこうやって自分のものにしておこう。
