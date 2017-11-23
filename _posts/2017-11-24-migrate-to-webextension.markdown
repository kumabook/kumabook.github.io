---
layout: post
title:  webextension対応のバタバタとfirefox quantumとwebextensionについて思っていること
date:   2017-11-24 06:00:42 +0900
categories: javascript, webextension, programminng
---

ここ最近は学生の頃から作っていた
firefoxのアドオン [stickynotes](https://addons.mozilla.org/ja/firefox/addon/sticky-notes/)
をwebextensionに対応させる作業をしていた。

 夏休みの宿題ばりにギリギリでfirefox quantumのリリース日にwebextensionバージョンをあげるという始末だった。
 そういえばドリル系はさっさと済ませるが、読書感想文とか自由研究とかがギリギリになっちゃうタイプだった。


 で、案の上、ユーザからちらほら問い合わせのメールがきた。
 本当は、データをsqliteからindexedDBに移行するバージョンを移行期間をたっぷり設けてリリースするはずだったのだが、
 あまりにもギリギリすぎて結局AMOでacceptされなかった。
 どうやら最近はレビューもかなり自動化されていて、レガシーなアドオンはacceptされなくなっているよう。
 で結局、移行するバージョンは開発者モードでインストールする必要があって、
 、[こういうページ](https://github.com/kumabook/stickynotes/wiki/%E6%97%A7%E3%82%A2%E3%83%89%E3%82%AA%E3%83%B3%E3%81%8B%E3%82%89webextension%E3%81%B8%E3%81%AE%E7%A7%BB%E8%A1%8C) を作らなければいけないほど、めんどくさい感じになってしまった。


 これで一安心かな思ってたけど、8000件くらいデータがあってメモリ不足になるよっていうメールが１件きた。
 バグ報告は普通は嬉しくないのだが、そんなにヘビーに使ってくれてるなんて逆に胸アツだったので、真っ先に対応した。
 1000件ずつやるようにしたんだけど、いろんなものが非同期なので、割としんどかった。

 あと「パスワードが変更できない」っという指摘もあった。多分railsバージョンアップした時にデグレったっぽいのだが、
 これは完全に自動テスト書いとけば良かった案件。


 全体的にドタバタしたけど、他のアドオンは対応してないのもあるからか、やたら褒めてくれる人が多かった。
 なんという優しい世界。


 Androidも対応も流れでやった。
 iOSはアドオンの仕組みがないので、代わりに[アプリ版](https://itunes.apple.com/us/app/sticky-notes-put-a-sticky-on-your-web/id992415126?l=es&mt=8)を出している。
 chrome, Edge, Operaも対応すれば、
 Desktop 3ブラウザとandroid, iOSでデータが共有できるので なかなか便利な気がする。
 webextesion対応辛かったけど、他のブラウザへの対応がかなり楽になったし、
 コードもかなりモダンにすることができたので、そこは怪我の功名といったところかなと思う。


 -----------------------------------------------------



 弱小だが細々と１０年アドオンデベロッパーをやっていて、
 今までも

 - xul からjetpackへの以降
 - multi process対応

など大きな変化はあったが、
今回のfirefox quantumでのwebextension対応は比にならないほど大きい。
firefoxはアイデンティティを変えたのだと思う。
ギーク向けでアドオンによるカスタマイズ性が売りだったけど、
今はパフォーマンスや最新の機能への対応で勝負するというストロングスタイルである。
 アドオンデベロッパーとしては悲しくもあるが、
 Mozillaはソフトウェアを作るものとして１ミリも逃げていないと思うので、
 この流れには大賛成である。実験的プロジェクトだったrust, servoが実際にfirefoxに
 載っている時点で我々は胸を熱くしているのだから。



あと、これはアドオンデベロッパーじゃないとわからないと思うが、
7~8年前のnodejsの登場から始まるJavaScript界隈の進化にアドオン開発は取り残されてきた感じがあったのだが、
今回のwebextensionへの移行の流れで一気に追いついた思う。
今回[web-ext](https://github.com/mozilla/web-ext)というツールが提供されているがこれはnodejs製で、
nodejsのインタフェースがあるので、gulpやwebpackといったツールとも連携しやすい。
その前は[jpm](https://github.com/mozilla-jetpack/jpm)というツールでこれはpython製だった。
また、サンプルプロジェクトやweb-extなど全体を通して
webpackやbabel・typescriptといったものをどんどん使って行こうという雰囲気がヒシヒシと伝わってくる感じが良い。
web-extの使いごごちも良いし、chrome対応向けの[webextension-polyfill](https://github.com/mozilla/webextension-polyfill) なんかもある。
documentもMDNにはいろんなブラウザのサポート状況が書いてあって、
これからwebextensionのAPIをMozillaが引っ張っていくぞっていう意志が感じられる。
googleにはそこまでwebextensionについて、他と足並みを揃えたり、開発ツールを提供してくれてる感じはなかったような気がする。
やはり、彼らにとってはブラウザのアドオンはいくつも作ってるプラットフォームの一つでしかないのだろう。
webextensionの時代になってもMozillaがリーダーとなって進んでいくのではないかなと感じている。
昔に比べるとできることは少ないけど、これからwebextensionが進化していく流れがきて欲しいなと願っている。
