---
layout: post
title:  さよならvisor, gnu screen、こんにちはiTerm2, tmux
date:   2015-10-05 00:00:00 UTC+9
categories: programming, utility
---

mac book air 128GBモデル使っているせいで最近SSDのパンパンで1日に数回xcodeのキャッシュを削除するという事態に見舞われていたので、
思いっきってel capitanをクリーンインストールした。
これを機に色々身の回りのツールを見直すことにした。

## termianl 周り

かれこれ visor, その後継のtotal terminal + gnu screenの組み合わせを8年くらい続けていたが、
今回のOSアップデートでtotal terminalの手法がセキュリティ的に弾かれてしまうらしく、
セーフモードで立ち上げて云々カンヌンしないいけなくなったらしい。
おまけに作者がiTerm2使うからもう開発しないよと言っている。
ということで自分もiTerm2へ移行することにした。
ついでに gnu screenからtmuxへ移行することにした。

iTerm2は特に凝った機能は使わずにhotkeyぐらいしか今のところ使っていないが、
total terminalとほとんど操作感も変わらないので満足。

tmuxの方は、とりあえず一通り設定してみたがgnu screenよりは高機能っぽいので、
慣れれば、効率は上がりそう。何よりクリップボード連携ができるようになったのが嬉しい。
powerline とかも頑張って入れてみた。かなりモダンな感じになった。

<img src="/assets/tmux_powerline.png" alt="tmux_powerline" style="width: 600px;"/>

## 環境構築ツール

https://github.com/kumabook/dotfiles

で各種設定ファイルを管理。
emacsのプラグインはcaskで。
homebrewの管理はBrewfileで管理。
Brewfileはメンテしてなかったので、
今回ゼロから作り直した。brew bundle は一悶着あった気がするが、
[homebrew-bundle][]
に落ち着いたようだ。
アプリケーションも極力 [homebrew-cask][] で入れるようにした。

[homebrew-bundle]: https://github.com/Homebrew/homebrew-bundle
[homebrew-cask]: https://github.com/caskroom/homebrew-cask

ディスクスペースもかなり余裕が出てきて断捨離した感じだ。
部屋の掃除もしないとな。
