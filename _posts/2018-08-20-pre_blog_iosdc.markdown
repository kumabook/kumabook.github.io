---
layout: post
title:  "iOSDCで音楽プレーヤーライブラリについての話をします"
date:   2018-08-20 09:47:09 +0900
categories: programming
---

 iOSDC Japan 2018に登壇します。
 内容は、自社でやっているアプリ用に作った[音楽プレーヤライブラリ](https://github.com/kumabook/PlayerKit)の話をメインでしようと思っています。
 15分と30分両方に申し込んでいましたが30分の方が採択されて時間が少しありそうなので、
 iOSでの音楽プレーヤの全般的な話も盛り込みつつ話したいと思っています。


 作成した音楽プレーヤライブラリは、apple musicやspotify・youtubeなどの複数のサービスの曲を統一して扱えるようにしたライブラリです。
 それぞれの音楽サービスはそれぞれsdkが用意されていてそれ自体を扱うのは簡単なのですが、それぞれに再生キューやライフサイクルを持っているため、
 統一的に扱うには少し面倒です。
 なので各プレーヤをswift protocolで表現することで、統一的に扱えるようにしました。

  - プレーヤUIとのIF
  - ライブラリの他ライブラリ依存が肥大化しないようにする
  - 無料・有料会員で試聴と視聴をスイッチする

  などいくつか設計する際に気をつけた点があるので、その辺りも説明したいと思っています。
  今回作ったものはいわゆるラッパー系ライブラリで実装自体はシンプルなので、
  どっちかっていうと音楽プレーヤ・サービス特有の問題についてどう対処したのかが面白いポイントではないかと思っています。

  Spotify・Apple Music・YouTubeなどメジャーなサービスの再生を実装してその辺あたりには詳しくなってきたので、
  時間を調整しつつその辺の知見も合わせて紹介したいと思います。

  - iOSで再生できる音楽サービスの紹介
  - MusicKit の使い方
  - Spotify iOS SDKの使い方
  - ...

 発表後に意見を交換する場もあるらしいのです。
 普段音楽系アプリを作っているのですが、同じようなことをやっている知り合いがいないので、
 業務でやっている人や興味ある人とお話したいと思いますので、よろしくお願いします。
