---
layout: post
title:  "Get started in blogging with github+jekyll"
date:   2014-04-06 23:45:22
categories: others
---

社会人４年目になり、イッパシのエンジニアになれている気が一向にしないので、
その不安を払拭すべく技術ブログをはじめます。

テンションのあがる方にしようということで、github+jekyllを利用することにしました。

jekyll はrubyですが、Haskell用のhakyll というのもあるようですね。

jekyll bootstrap とかあるみたいですが、せっかくなので徐々に機能を追加していこうと思います。

とりあえず、ざっと以下のものをやりたい
* twitter bootstrapのcssを当てる
* Category別, Tag別, 時系列別表示をページをつける
* コメント機能を加える
*

以下今回やったこと

* https://pages.github.com/ に従ってレポジトリを作成
  1. username.github.io という名前のレポジトリをgithub 上に作成
  2. `$git clone https://github.com/username/username.github.io`
* jekyll をインストール
  1. echo "gem 'jekyll'" > Gemfile
  2. bundle install
* ひな形を作成
  1. jekyll new .
  2. _config.yml を適宜修正
