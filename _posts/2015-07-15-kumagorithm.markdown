---
layout: post
title:  そして意識の高みへ
date:   2015-07-15 00:00:00 UTC+9
categories: programming, algorithm
---

アルゴリズムの勉強用の環境をいろいろと整えたのでそのメモ。


## 実装言語・環境

まず勉強するにあたって、大事なことは継続することである。
３日坊主にならないための仕掛けを用意したいと思った。

### アウトプット

自分はけっこう面倒くさがり屋だが、
昔からノートを綺麗にとったりアウトプットが積み重なってくるとだんだん楽しくなってくるタイプだった。
自分がレベルアップしている感じがして良い。
また、publicなところに置いておくことで適度な緊張感が生まれて良い。

### なるべく細かい単位で

とはいっても社会人には時間がない。英語の勉強や趣味アプリの開発もあるので、
毎日1時間勉強時間を確保するのもやっとである。
できるだけ細かい単位でアウトプットできると継続できるはずだ。

### JavaScript＋SVGで視覚化

 Cで実装してemscripten(webGL)というのも試したが、色々辛くて長続きしなさそうだったので、
JavaScriptで実装して、SVGで視覚化とすることにした。


## 実装方法
まず、UIライブラリだが、なんでも良かったのだがせっかくなので流行りものをつかってみたくて、
[React] + [D3.js] を組み合わせて使ってみることにした。
全体を[React]のコンポーネントにして、中のSVGの図形描画はD3.jsで直接描画する感じ。
[D3.js]はVirtual DOMの管理外なので、componentDidUpdateなどで更新する。

次に、やってみてわかったのだが、アルゴリズムの視覚化で重要なのが、
描画の処理をどこで差し込むかである。
シンプルな方法でcallbackを登録する方式でも良かったが、ES6の[generator]()を
今回は使ってみた。
関数を`function*() {...}`と定義しておくと、その関数はgeneratorオブジェクトを返すようになる。
generatorオブジェクトを経由で関数の実行を中断したりできるようになる。
描画処理を差し込みたいタイミングでいったん`yield`しておくと、
generator#next()を呼んだときに処理がそこで中断されるのでそこで描画処理をする。
yieldに値を渡すこともできる。
ソートのときにはベーシックなcompareとswap操作のたびに
再描画するようにしていてその対象のインデックスをyieldに渡している。
[generator]はES6の機能なのでbabel経由で使うことになる。さらに[generator]()を使うには
babelのruntimeオプションをつけておく必要がある。

## ブログ埋め込み
Reactコンポーネントとして実装したので、ブログに埋め込むのは非常に簡単である。

```
    <div id="container"></div>
    kumagorithm.render(document.getElementById('container'), 'selection-sort')
```

みたいに書けばOK。
ライブラリをどこに置くかだが、ソースはgithubにおいているので、github pageを使うのがよい。
github page は、プロジェクトのgithub pageは user_name.github.io/project_name
にデプロイされるので、

```
    <script type="text/javascript" src="http://kumabook.github.io/kumagorithm/javascripts/dist/kumagorithm.js"></script>
    <div id="container"></div>
    <script type="text/javascript">
        kumagorithm.render(document.getElementById('container'), 'selection-sort');
    </script>
```

これで埋め込めるようになった。


<script type="text/javascript" src="http://kumabook.github.io/kumagorithm/javascripts/dist/kumagorithm.js"></script>
<div id="container"></div>
<script type="text/javascript">
    kumagorithm.render(document.getElementById('container'), 'selection-sort');
</script>

ちなみにmasterにソースをpushするとwebpackでパッケージングしてgh-pagesブランチにpushするというのを
travis CIで自動できるようにした。
これでアウトプットの環境が整ったぜ。


モチベーションをキープして継続的なアウトプットをコミットする、
そして意識の高みへ。

<img src="http://livedoor.blogimg.jp/jigokuno_misawa/imgs/1/9/199d70a1.gif">

[generator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator
[babel]: https://babeljs.io/
[React]: https://facebook.github.io/react/
[D3.js]: http://d3js.org/
