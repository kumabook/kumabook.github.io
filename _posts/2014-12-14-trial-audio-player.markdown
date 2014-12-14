---
layout: post
title:  バンドのホームページリニューアル(試聴機能編)
date:   2014-12-14 00:00:00 UTC+9
categories: programming
---

 引き続きバンドのホームページを弄っている。
 販売はGumroadを使うこととしてみたので、
 今回は試聴機能を付け加えよう。


 基本方針は以下のような感じ。

 - 最低限最新のブラウザで動けばよいとする
 - 試聴は30秒
 - UIのイメージはiTunesストア（シークバーなどは表示しない）

 audioタグを直接使っても良かったが、
 [audiojs](http://kolber.github.io/audiojs/)が良さそうだったので使ってみることにした。
 一応 flashでfallbackしてくれるみたい。

 実装してみると、想像以上にいっぱいハマった。
 - ios 端末では 連続再生ができない。どうやらclick イベントのイベントハンドラの中でしか
 playメソッドが効かないという仕様らしい。
 - ios 7のipadで発生したが、preloadがされてない状況で`audio.curretTime=0`とすると
 `Error: InvalidStateError: DOM Exception 11`が発生する。
 とりあえず,`audio.curretTime=0.0000001`とかするとエラーは回避された。
 - 途中まで再生した状態で`audio.currentTime=0`とした後に再生すると、一瞬ノイズが走る。
 一旦volumeを0にした後で100msくらいsetTimeoutした後にvolumeを元に戻すことで回避。
 - CSS3アニメーション周り。まだベンダープレフィックスつけなあかんのか。

