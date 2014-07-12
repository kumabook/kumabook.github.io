---
layout: post
title:  "Deploy scotty app on heroku"
date:   2014-07-09 00:00:00 UTC+9
categories: diary, stickynotes
---
　
Herokuは公式にはHaskellをサポートしていない。
Third-Partyのbuildpackを使用する。

https://devcenter.heroku.com/articles/third-party-buildpacks

の一覧にある。
https://github.com/begriffs/heroku-buildpack-ghc
を今回は使う。

基本的には、[README.md](https://github.com/begriffs/heroku-buildpack-ghc/blob/master/README.md)に書いてある通りに行えばよい。


https://github.com/kumabook/stickynotes-backend/pull/1

1. Procfile　を追加。今回は以下とした。
  ```
    web: cabal run
  ```

2. heroku上に appを作成

  ```
    heroku create stickynotes-backend --stack=cedar --buildpack https://github.com/begriffs/heroku-buildpack-ghc.git
  ```

3. 環境変数PORT を使うようにアプリのコード修正
4. gitへデプロイ

  ```
     git push heroku master:master
  ```
