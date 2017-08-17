---
layout: post
title:  HTMLの本文抽出についての調査
date:   2018-08-16 21:24:03 +0900
categories: nlp
---

 最近作ろうとしているものにだんだんと必要になって来た「HTMLの本文抽出」。


 例えばスマートニュースやPocketなどでのみられる「最適化された記事表示」。
 昨今のモバイル回線事情を鑑みるに、UXを追求するとどうしても欲しくなってくる。

 他の場面でも必要だったりする。それは検索エンジンや記事分類の前処理としての本文抽出。
 HTMLからタグやCSSやJavaScriptを抜くのはもちろんだが、
 いわゆるUIパーツのHTMLを省いて記事本体のみを抽出できると、検索精度があがる。
 例えば、カレンダーパーツが設置されていたりすると、どのページでも「１月」が引っかかりしてしまい、本当に「１月」について述べている記事が埋もれてしまう。


 世の中では至る所で必要となる技術なので、いくつか手法がweb上に載っていることを期待して調査してみる。
読んだページをあげてみる。

- [PythonでブログのHTMLから本文抽出 2015](http://orangain.hatenablog.com/entry/content-extraction-from-html-in-python)
  - まとめてくれてる有難い
- [readability](https://github.com/kingwkb/readability)
  - arc90labs-readabilityのポート
- [Goose](http://jimplush.com/blog/goose)
  - Gooseというオープンソースの本文抽出ライブラリがあるようだ。
- [HTMLからの本文抽出](https://www.slideshare.net/oarat/html-56830187)
  - HTMLをブロックに分けて、ブロックごとにスコアをつけて本文を判定するみたい
  - スコアは、句読点が多いとか、本文が長いとかそういう観点で決めるみたい
- [単純アルゴリズムで言語に依存しないHTML本文抽出 sweepy.py（Python）](https://nktmemo.wordpress.com/2014/02/16/%E5%8D%98%E7%B4%94%E3%82%A2%E3%83%AB%E3%82%B4%E3%83%AA%E3%82%BA%E3%83%A0%E3%81%A7%E8%A8%80%E8%AA%9E%E3%81%AB%E4%BE%9D%E5%AD%98%E3%81%97%E3%81%AA%E3%81%84html%E6%9C%AC%E6%96%87%E6%8A%BD%E5%87%BA-sweepy/)
- [CRF を使った Web 本文抽出](https://www.slideshare.net/shuyo/crf-web)
  - 機械学習と絡める
- [snacktory](https://github.com/karussell/snacktory)
  - Readability のJava clone. ちょっと改良も入っているっぽい
- [Webstemmer](http://www.unixuser.org/~euske/python/webstemmer/index-j.html)
  - レイアウト情報を元に使う。クローラ付き


所感では、readability・extracontentあたりは実装がそこまででかくないので（どちらもpythonで3000行程度)、
この辺を実際に試してみて、精度が良さそうならrustポーティングして利用する感じでいきたい。
本文抽出の段階で機会学習を使うのは今の段階ではオーバスペックかな。

どうでもいいけど、画像が多くて本文が少なく抽出しづらいということで「しょこたんブログ」が本文抽出で有名なのはツボだった。
